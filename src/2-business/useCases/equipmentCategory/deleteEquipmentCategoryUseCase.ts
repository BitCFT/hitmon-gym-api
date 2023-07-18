import { inject, injectable } from 'inversify';
import { IUseCase } from '../iUseCase';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import {
  InputDeleteEquipmentCategoryDto,
  OutputDeleteEquipmentCategoryDto,
} from '@business/dto/equipmentCategoryDto.ts/deleteEquipmentCategoryDto';
import { left, right } from '@shared/either';
import {
  deleteEquipmentCategoryGeneralError,
  equipmentCategoryIsNotFoundError,
} from '@business/module/errors/equipmentCategory/equipmentCategory';

@injectable()
export class DeleteEquipmentCategoryUseCase
  implements IUseCase<InputDeleteEquipmentCategoryDto, OutputDeleteEquipmentCategoryDto>
{
  constructor(
    @inject(IEquipmentCategoryRepositoryToken) private equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(ILoggerServiceToken) private logService: ILoggerService
  ) {}

  async exec(input: InputDeleteEquipmentCategoryDto): Promise<OutputDeleteEquipmentCategoryDto> {
    try {
      const equipmentCategory = await this.equipmentCategoryRepository.findById(input.id);

      if (!equipmentCategory) {
        return left(equipmentCategoryIsNotFoundError);
      }

      await this.equipmentCategoryRepository.delete(input.id);

      return right(undefined);
    } catch (error: any) {
      this.logService.error(error);
      return left(deleteEquipmentCategoryGeneralError(error?.message));
    }
  }
}
