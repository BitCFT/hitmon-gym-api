import { InputListEquipmentsDto, OutputListEquipmentsDto } from '@business/dto/equipment/listEquipmentsDto';
import { IUseCase } from '@business/useCases/iUseCase';
import { inject, injectable } from 'inversify';
import { PaginationParams } from '@domain/pagination';
import { IEquipmentRepository } from '@business/repositories/equipment/iEquipmentRepository';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { left, right } from '@shared/either';
import { ListEquipmentsGeneralError } from '@business/module/errors/equipment/equipment';
import { IEquipmentRepositoryToken } from '@business/repositories/equipment/types';

@injectable()
export class ListEquipmentsUseCase implements IUseCase<InputListEquipmentsDto, OutputListEquipmentsDto> {
  constructor(
    @inject(IEquipmentRepositoryToken) private readonly equipmentRepository: IEquipmentRepository,
    @inject(ILoggerServiceToken) private readonly logService: ILoggerService
  ) {}

  async exec(input: PaginationParams): Promise<OutputListEquipmentsDto> {
    try {
      const equipments = await this.equipmentRepository.listAll(input);

      return right(equipments);
    } catch (error) {
      this.logService.error(error);
      return left(ListEquipmentsGeneralError);
    }
  }
}
