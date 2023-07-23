import { InputCreateEquipmentDto, OutputCreateEquipmentDto } from '@business/dto/equipment/createEquipmentDto';
import { createEquipmentGeneralError, equipmentAlreadyInUseError } from '@business/module/errors/equipment/equipment';
import { equipmentCategoryIsNotFoundError } from '@business/module/errors/equipmentCategory/equipmentCategory';
import { IEquipmentRepository, IEquipmentRepositoryToken } from '@business/repositories/equipment/iEquipmentRepository';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IUniqueIdentifierService, IUniqueIdentifierServiceToken } from '@business/services/iUniqueIdentifierService';
import { IUseCase } from '@business/useCases/iUseCase';
import { EquipmentEntity } from '@domain/entities/equipmentEntity';
import { left, right } from '@shared/either';
import { inject, injectable } from 'inversify';

@injectable()
export class CreateEquipmentUseCase implements IUseCase<InputCreateEquipmentDto, OutputCreateEquipmentDto> {
  constructor(
    @inject(IEquipmentRepositoryToken) private equipmentRepository: IEquipmentRepository,
    @inject(IEquipmentCategoryRepositoryToken) private equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(IUniqueIdentifierServiceToken) private uniqueIdentifierService: IUniqueIdentifierService,
    @inject(ILoggerServiceToken) private logService: ILoggerService
  ) {}

  async exec(input: InputCreateEquipmentDto): Promise<OutputCreateEquipmentDto> {
    try {
      const { name, categoryId } = input;
      const [equipmentByName, equipmentCategory] = await Promise.all([
        this.equipmentRepository.findByName(name),
        this.equipmentCategoryRepository.findById(categoryId),
      ]);

      if (equipmentByName) {
        return left(equipmentAlreadyInUseError);
      }

      if (!equipmentCategory) {
        return left(equipmentCategoryIsNotFoundError);
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
      return left(createEquipmentGeneralError);
    }
  }
}
