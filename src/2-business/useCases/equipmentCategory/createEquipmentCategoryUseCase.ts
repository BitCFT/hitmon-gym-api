import {
  InputCreateEquipmentCategoryDto,
  OutputCreateEquipmentCategoryDto,
} from '@business/dto/equipmentCategoryDto.ts/createEquipmentCategoryDto';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { IUseCase } from '@business/useCases/iUseCase';
import { inject, injectable } from 'inversify';
import { left, right } from '@shared/either';
import {
  createEquipmentCategoryGeneralError,
  equipmentCategoryAlreadyInUseError,
} from '@business/module/errors/equipmentCategory/equipmentCategory';
import { EquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { IUniqueIdentifierService, IUniqueIdentifierServiceToken } from '@business/services/iUniqueIdentifierService';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';

@injectable()
export class CreateEquipmentCategoryUseCase
  implements IUseCase<InputCreateEquipmentCategoryDto, OutputCreateEquipmentCategoryDto>
{
  constructor(
    @inject(IEquipmentCategoryRepositoryToken) private equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(IUniqueIdentifierServiceToken) private uniqueIdentifierService: IUniqueIdentifierService,
    @inject(ILoggerServiceToken) private logService: ILoggerService
  ) {}

  async exec(input: InputCreateEquipmentCategoryDto): Promise<OutputCreateEquipmentCategoryDto> {
    try {
      const nameAlreadyExists = await this.equipmentCategoryRepository.findByName(input.name);

      if (nameAlreadyExists) {
        return left(equipmentCategoryAlreadyInUseError);
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
      return left(createEquipmentCategoryGeneralError);
    }
  }
}
