import {
  InputCreateEquipmentCategoryDto,
  OutputCreateEquipmentCategoryDto,
} from '@business/dto/equipmentCategory/createEquipmentCategoryDto';
import { IEquipmentCategoryRepository } from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { IUseCase } from '@business/useCases/iUseCase';
import { inject, injectable } from 'inversify';
import { left, right } from '@shared/either';
import {
  CreateEquipmentCategoryGeneralError,
  EquipmentCategoryAlreadyInUseError,
} from '@business/module/errors/equipmentCategory/equipmentCategory';
import { EquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { IUniqueIdentifierService, IUniqueIdentifierServiceToken } from '@business/services/iUniqueIdentifierService';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IEquipmentCategoryRepositoryToken } from '@business/repositories/equipmentCategory/types';

@injectable()
export class CreateEquipmentCategoryUseCase
  implements IUseCase<InputCreateEquipmentCategoryDto, OutputCreateEquipmentCategoryDto>
{
  constructor(
    @inject(IEquipmentCategoryRepositoryToken)
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(IUniqueIdentifierServiceToken) private readonly uniqueIdentifierService: IUniqueIdentifierService,
    @inject(ILoggerServiceToken) private readonly logService: ILoggerService
  ) {}

  async exec(input: InputCreateEquipmentCategoryDto): Promise<OutputCreateEquipmentCategoryDto> {
    try {
      const nameAlreadyExists = await this.equipmentCategoryRepository.findByName(input.name);

      if (nameAlreadyExists) {
        return left(EquipmentCategoryAlreadyInUseError);
      }

      const equipmentCategoryEntity = EquipmentCategoryEntity.create({
        id: this.uniqueIdentifierService.create(),
        ...input,
      });

      if (equipmentCategoryEntity.isLeft()) {
        return left(equipmentCategoryEntity.value);
      }

      const equipmentCategory = await this.equipmentCategoryRepository.create(equipmentCategoryEntity.value.export());

      return right(equipmentCategory);
    } catch (error) {
      this.logService.error(error);
      return left(CreateEquipmentCategoryGeneralError);
    }
  }
}
