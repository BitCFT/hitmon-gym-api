import { inject, injectable } from 'inversify';
import { IUseCase } from '../iUseCase';
import { InputUpdateEquipmentDto, OutputUpdateEquipmentDto } from '@business/dto/equipment/updateEquipmentDto';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IEquipmentRepository, IEquipmentRepositoryToken } from '@business/repositories/equipment/iEquipmentRepository';
import { left, right } from '@shared/either';
import {
  equipmentAlreadyInUseError,
  equipmentIsNotFoundError,
  updateEquipmentGeneralError,
} from '@business/module/errors/equipment/equipment';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { equipmentCategoryIsNotFoundError } from '@business/module/errors/equipmentCategory/equipmentCategory';

@injectable()
export class UpdateEquipmentUseCase implements IUseCase<InputUpdateEquipmentDto, OutputUpdateEquipmentDto> {
  constructor(
    @inject(IEquipmentRepositoryToken) private equipmentRepository: IEquipmentRepository,
    @inject(IEquipmentCategoryRepositoryToken) private equipmentCategoryRepository: IEquipmentCategoryRepository,
    @inject(ILoggerServiceToken) private logService: ILoggerService
  ) {}

  async exec(input: InputUpdateEquipmentDto): Promise<OutputUpdateEquipmentDto> {
    try {
      const equipment = await this.equipmentRepository.findById(input.id);

      if (!equipment) {
        return left(equipmentIsNotFoundError);
      }

      if (input.params.name) {
        const { name } = input.params;
        const equipmentByName = await this.equipmentRepository.findByName(name);

        if (equipmentByName && equipmentByName.name !== equipment.name) {
          return left(equipmentAlreadyInUseError);
        }
      }

      if (input.params.categoryId) {
        const { categoryId } = input.params;
        const equipmentCategory = await this.equipmentCategoryRepository.findById(categoryId);

        if (!equipmentCategory) {
          return left(equipmentCategoryIsNotFoundError);
        }
      }

      const updatedEquipment = await this.equipmentRepository.update({
        id: input.id,
        params: input.params,
      });

      return right(updatedEquipment);
    } catch (error) {
      this.logService.error(error);
      return left(updateEquipmentGeneralError);
    }
  }
}
