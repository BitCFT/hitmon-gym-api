import { inject, injectable } from 'inversify';
import { IUseCase } from '../iUseCase';
import {
  InputUpdateEquipmentCategoryDto,
  OutputUpdateEquipmentCategoryDto,
} from '@business/dto/equipmentCategory/updateEquipmentCategoryDto';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { left, right } from '@shared/either';
import {
  equipmentCategoryAlreadyInUseError,
  equipmentCategoryIsNotFoundError,
  updateEquipmentCategoryGeneralError,
} from '@business/module/errors/equipmentCategory/equipmentCategory';

@injectable()
export class UpdateEquipmentCategoryUseCase
  implements IUseCase<InputUpdateEquipmentCategoryDto, OutputUpdateEquipmentCategoryDto>
{
  constructor(
    @inject(IEquipmentCategoryRepositoryToken) private equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(ILoggerServiceToken) private logService: ILoggerService
  ) {}

  async exec(input: InputUpdateEquipmentCategoryDto): Promise<OutputUpdateEquipmentCategoryDto> {
    try {
      const equipmentCategory = await this.equipmentCategoryRepository.findById(input.id);

      if (!equipmentCategory) {
        return left(equipmentCategoryIsNotFoundError);
      }

      if (input.params.name) {
        const { name } = input.params;
        const equipmentCategoryByName = await this.equipmentCategoryRepository.findByName(name);

        if (equipmentCategoryByName && equipmentCategoryByName.name !== equipmentCategory.name) {
          return left(equipmentCategoryAlreadyInUseError);
        }
      }

      const updatedEquipmentCategory = await this.equipmentCategoryRepository.update({
        id: input.id,
        params: input.params,
      });

      return right(updatedEquipmentCategory);
    } catch (error) {
      this.logService.error(error);
      return left(updateEquipmentCategoryGeneralError);
    }
  }
}
