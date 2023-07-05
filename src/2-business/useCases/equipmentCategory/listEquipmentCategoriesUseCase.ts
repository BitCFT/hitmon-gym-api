import {
  InputListEquipmentCategoriesDto,
  OutputListEquipmentCategoriesDto,
} from '@business/dto/equipmentCategoryDto.ts/listEquipmentCategoriesDto';
import { IUseCase } from '../iUseCase';
import { PaginationParams } from '@domain/pagination';
import { inject, injectable } from 'inversify';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { left, right } from '@shared/either';
import { listEquipmentCategoriesGeneralError } from '@business/module/errors/equipmentCategory/equipmentCategory';

@injectable()
export class ListEquipmentCategoriesUseCase
  implements IUseCase<InputListEquipmentCategoriesDto, OutputListEquipmentCategoriesDto>
{
  constructor(
    @inject(IEquipmentCategoryRepositoryToken) private equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(ILoggerServiceToken) private logService: ILoggerService
  ) {}

  async exec(input: PaginationParams): Promise<OutputListEquipmentCategoriesDto> {
    try {
      const equipmentCategories = await this.equipmentCategoryRepository.listAll(input);

      return right(equipmentCategories);
    } catch (error) {
      this.logService.error(error);
      return left(listEquipmentCategoriesGeneralError);
    }
  }
}
