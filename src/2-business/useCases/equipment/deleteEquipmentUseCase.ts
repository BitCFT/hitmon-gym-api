import { inject, injectable } from 'inversify';
import { IUseCase } from '../iUseCase';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { left, right } from '@shared/either';
import { InputDeleteEquipmentDto, OutputDeleteEquipmentDto } from '@business/dto/equipment/deleteEquipmentDto';
import { IEquipmentRepository, IEquipmentRepositoryToken } from '@business/repositories/equipment/iEquipmentRepository';
import { deleteEquipmentGeneralError, equipmentIsNotFoundError } from '@business/module/errors/equipment/equipment';

@injectable()
export class DeleteEquipmentUseCase implements IUseCase<InputDeleteEquipmentDto, OutputDeleteEquipmentDto> {
  constructor(
    @inject(IEquipmentRepositoryToken) private equipmentRepository: IEquipmentRepository,
    @inject(ILoggerServiceToken) private logService: ILoggerService
  ) {}

  async exec(input: InputDeleteEquipmentDto): Promise<OutputDeleteEquipmentDto> {
    try {
      const equipment = await this.equipmentRepository.findById(input.id);

      if (!equipment) {
        return left(equipmentIsNotFoundError);
      }

      await this.equipmentRepository.delete(input.id);

      return right(undefined);
    } catch (error: any) {
      this.logService.error(error);
      return left(deleteEquipmentGeneralError);
    }
  }
}
