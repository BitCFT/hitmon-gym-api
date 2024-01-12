import { InputCreateEquipmentDto, OutputCreateEquipmentDto } from '@business/dto/equipment/createEquipmentDto';
import { CreateEquipmentGeneralError, EquipmentAlreadyInUseError } from '@business/module/errors/equipment/equipment';
import { EquipmentCategoryIsNotFoundError } from '@business/module/errors/equipmentCategory/equipmentCategory';
import { IEquipmentRepository, IEquipmentRepositoryToken } from '@business/repositories/equipment/iEquipmentRepository';
import { IEquipmentCategoryRepository } from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { IEquipmentCategoryRepositoryToken } from '@business/repositories/equipmentCategory/types';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IUniqueIdentifierService, IUniqueIdentifierServiceToken } from '@business/services/iUniqueIdentifierService';
import { IUseCase } from '@business/useCases/iUseCase';
import { EquipmentEntity } from '@domain/entities/equipmentEntity';
import { left, right } from '@shared/either';
import { inject, injectable } from 'inversify';

@injectable()
export class CreateEquipmentUseCase implements IUseCase<InputCreateEquipmentDto, OutputCreateEquipmentDto> {
  constructor(
    @inject(IEquipmentRepositoryToken) private readonly equipmentRepository: IEquipmentRepository,
    @inject(IEquipmentCategoryRepositoryToken)
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(IUniqueIdentifierServiceToken) private readonly uniqueIdentifierService: IUniqueIdentifierService,
    @inject(ILoggerServiceToken) private readonly logService: ILoggerService
  ) {}

  async exec(input: InputCreateEquipmentDto): Promise<OutputCreateEquipmentDto> {
    try {
      const { name, categoryId } = input;
      const [equipmentByName, equipmentCategory] = await Promise.all([
        this.equipmentRepository.findByName(name),
        this.equipmentCategoryRepository.findById(categoryId),
      ]);

      if (equipmentByName) {
        return left(EquipmentAlreadyInUseError);
      }

      if (!equipmentCategory) {
        return left(EquipmentCategoryIsNotFoundError);
      }

      const equipmentEntity = EquipmentEntity.create({
        ...input,
        id: this.uniqueIdentifierService.create(),
      });

      if (equipmentEntity.isLeft()) {
        return left(equipmentEntity.value);
      }

      const equipment = await this.equipmentRepository.create(equipmentEntity.value.export());

      return right(equipment);
    } catch (error) {
      this.logService.error(error);
      return left(CreateEquipmentGeneralError);
    }
  }
}
