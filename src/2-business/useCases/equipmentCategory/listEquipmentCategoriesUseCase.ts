import {
  InputListEquipmentCategoriesDto,
  OutputListEquipmentCategoriesDto,
} from '@business/dto/equipmentCategory/listEquipmentCategoriesDto';
import { IUseCase } from '@business/useCases/iUseCase';
import { PaginationParams } from '@domain/pagination';
import { inject, injectable } from 'inversify';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { left, right } from '@shared/either';
import { ListEquipmentCategoriesGeneralError } from '@business/module/errors/equipmentCategory/equipmentCategory';

@injectable()
export class ListEquipmentCategoriesUseCase
  implements IUseCase<InputListEquipmentCategoriesDto, OutputListEquipmentCategoriesDto>
{
  constructor(
    @inject(IEquipmentCategoryRepositoryToken)
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(ILoggerServiceToken) private readonly logService: ILoggerService
  ) {}

  async exec(input: PaginationParams): Promise<OutputListEquipmentCategoriesDto> {
    try {
      const equipmentCategories = await this.equipmentCategoryRepository.listAll(input);

      return right(equipmentCategories);
    } catch (error) {
      this.logService.error(error);
      return left(ListEquipmentCategoriesGeneralError);
    }
  }
}
