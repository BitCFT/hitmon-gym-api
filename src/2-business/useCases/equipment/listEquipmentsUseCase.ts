import { InputListEquipmentsDto, OutputListEquipmentsDto } from '@business/dto/equipment/listEquipmentsDto';
import { IUseCase } from '../iUseCase';
import { inject, injectable } from 'inversify';
import { PaginationParams } from '@domain/pagination';
import { IEquipmentRepository, IEquipmentRepositoryToken } from '@business/repositories/equipment/iEquipmentRepository';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { left, right } from '@shared/either';
import { listEquipmentsGeneralError } from '@business/module/errors/equipment/equipment';

@injectable()
export class ListEquipmentsUseCase implements IUseCase<InputListEquipmentsDto, OutputListEquipmentsDto> {
  constructor(
    @inject(IEquipmentRepositoryToken) private equipmentRepository: IEquipmentRepository,
    @inject(ILoggerServiceToken) private logService: ILoggerService
  ) {}

  async exec(input: PaginationParams): Promise<OutputListEquipmentsDto> {
    try {
      const equipments = await this.equipmentRepository.listAll(input);

      return right(equipments);
    } catch (error) {
      this.logService.error(error);
      return left(listEquipmentsGeneralError);
    }
  }
}
