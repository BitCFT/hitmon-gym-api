import { inject, injectable } from 'inversify';
import { IUseCase } from '@business/useCases/iUseCase';
import {
  InputUpdateEquipmentCategoryDto,
  OutputUpdateEquipmentCategoryDto,
} from '@business/dto/equipmentCategory/updateEquipmentCategoryDto';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IEquipmentCategoryRepository } from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { left, right } from '@shared/either';
import {
  EquipmentCategoryAlreadyInUseError,
  EquipmentCategoryIsNotFoundError,
  UpdateEquipmentCategoryGeneralError,
} from '@business/module/errors/equipmentCategory/equipmentCategory';
import { IEquipmentCategoryRepositoryToken } from '@business/repositories/equipmentCategory/types';

@injectable()
export class UpdateEquipmentCategoryUseCase
  implements IUseCase<InputUpdateEquipmentCategoryDto, OutputUpdateEquipmentCategoryDto>
{
  constructor(
    @inject(IEquipmentCategoryRepositoryToken)
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(ILoggerServiceToken) private readonly logService: ILoggerService
  ) {}

  async exec(input: InputUpdateEquipmentCategoryDto): Promise<OutputUpdateEquipmentCategoryDto> {
    try {
      const equipmentCategory = await this.equipmentCategoryRepository.findById(input.id);

      if (!equipmentCategory) {
        return left(EquipmentCategoryIsNotFoundError);
      }

      if (input.params.name) {
        const { name } = input.params;
        const equipmentCategoryByName = await this.equipmentCategoryRepository.findByName(name);

        if (equipmentCategoryByName && equipmentCategoryByName.name !== equipmentCategory.name) {
          return left(EquipmentCategoryAlreadyInUseError);
        }
      }

      const updatedEquipmentCategory = await this.equipmentCategoryRepository.update({
        id: input.id,
        params: input.params,
      });

      return right(updatedEquipmentCategory);
    } catch (error) {
      this.logService.error(error);
      return left(UpdateEquipmentCategoryGeneralError);
    }
  }
}
