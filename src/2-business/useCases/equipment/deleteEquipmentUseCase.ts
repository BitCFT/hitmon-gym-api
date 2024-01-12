import { inject, injectable } from 'inversify';
import { IUseCase } from '@business/useCases/iUseCase';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { left, right } from '@shared/either';
import { InputDeleteEquipmentDto, OutputDeleteEquipmentDto } from '@business/dto/equipment/deleteEquipmentDto';
import { IEquipmentRepository } from '@business/repositories/equipment/iEquipmentRepository';
import { DeleteEquipmentGeneralError, EquipmentIsNotFoundError } from '@business/module/errors/equipment/equipment';
import { IEquipmentRepositoryToken } from '@business/repositories/equipment/types';

@injectable()
export class DeleteEquipmentUseCase implements IUseCase<InputDeleteEquipmentDto, OutputDeleteEquipmentDto> {
  constructor(
    @inject(IEquipmentRepositoryToken) private readonly equipmentRepository: IEquipmentRepository,
    @inject(ILoggerServiceToken) private readonly logService: ILoggerService
  ) {}

  async exec(input: InputDeleteEquipmentDto): Promise<OutputDeleteEquipmentDto> {
    try {
      const equipment = await this.equipmentRepository.findById(input.id);

      if (!equipment) {
        return left(EquipmentIsNotFoundError);
      }

      await this.equipmentRepository.delete(input.id);

      return right(undefined);
    } catch (error: any) {
      this.logService.error(error);
      return left(DeleteEquipmentGeneralError);
    }
  }
}
