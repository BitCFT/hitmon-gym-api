import { inject, injectable } from 'inversify';
import { IUseCase } from '@business/useCases/iUseCase';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import {
  InputDeleteEquipmentCategoryDto,
  OutputDeleteEquipmentCategoryDto,
} from '@business/dto/equipmentCategory/deleteEquipmentCategoryDto';
import { left, right } from '@shared/either';
import {
  DeleteEquipmentCategoryGeneralError,
  EquipmentCategoryIsNotFoundError,
} from '@business/module/errors/equipmentCategory/equipmentCategory';

@injectable()
export class DeleteEquipmentCategoryUseCase
  implements IUseCase<InputDeleteEquipmentCategoryDto, OutputDeleteEquipmentCategoryDto>
{
  constructor(
    @inject(IEquipmentCategoryRepositoryToken)
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(ILoggerServiceToken) private readonly logService: ILoggerService
  ) {}

  async exec(input: InputDeleteEquipmentCategoryDto): Promise<OutputDeleteEquipmentCategoryDto> {
    try {
      const equipmentCategory = await this.equipmentCategoryRepository.findById(input.id);

      if (!equipmentCategory) {
        return left(EquipmentCategoryIsNotFoundError);
      }

      await this.equipmentCategoryRepository.delete(input.id);

      return right(undefined);
    } catch (error: any) {
      this.logService.error(error);
      return left(DeleteEquipmentCategoryGeneralError(error?.message));
    }
  }
}
