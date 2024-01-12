import { inject, injectable } from 'inversify';
import { IUseCase } from '@business/useCases/iUseCase';
import { InputUpdateEquipmentDto, OutputUpdateEquipmentDto } from '@business/dto/equipment/updateEquipmentDto';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IEquipmentRepository, IEquipmentRepositoryToken } from '@business/repositories/equipment/iEquipmentRepository';
import { left, right } from '@shared/either';
import {
  EquipmentAlreadyInUseError,
  EquipmentIsNotFoundError,
  UpdateEquipmentGeneralError,
} from '@business/module/errors/equipment/equipment';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { EquipmentCategoryIsNotFoundError } from '@business/module/errors/equipmentCategory/equipmentCategory';

@injectable()
export class UpdateEquipmentUseCase implements IUseCase<InputUpdateEquipmentDto, OutputUpdateEquipmentDto> {
  constructor(
    @inject(IEquipmentRepositoryToken) private readonly equipmentRepository: IEquipmentRepository,
    @inject(IEquipmentCategoryRepositoryToken)
    private readonly equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(ILoggerServiceToken) private readonly logService: ILoggerService
  ) {}

  async exec(input: InputUpdateEquipmentDto): Promise<OutputUpdateEquipmentDto> {
    try {
      const equipment = await this.equipmentRepository.findById(input.id);

      if (!equipment) {
        return left(EquipmentIsNotFoundError);
      }

      if (input.params.name) {
        const { name } = input.params;
        const equipmentByName = await this.equipmentRepository.findByName(name);

        if (equipmentByName && equipmentByName.name !== equipment.name) {
          return left(EquipmentAlreadyInUseError);
        }
      }

      if (input.params.categoryId) {
        const { categoryId } = input.params;
        const equipmentCategory = await this.equipmentCategoryRepository.findById(categoryId);

        if (!equipmentCategory) {
          return left(EquipmentCategoryIsNotFoundError);
        }
      }

      const updatedEquipment = await this.equipmentRepository.update({
        id: input.id,
        params: input.params,
      });

      return right(updatedEquipment);
    } catch (error) {
      this.logService.error(error);
      return left(UpdateEquipmentGeneralError);
    }
  }
}
