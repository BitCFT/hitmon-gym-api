import { AbstractOperator } from '../abstractOperator';
import {
  InputCreateEquipment,
  OutputCreateEquipment,
} from '@controller/serializers/equipment/createEquipmentSerializer';
import { inject, injectable } from 'inversify';
import { OutputCreateEquipmentDto } from '@business/dto/equipment/createEquipmentDto';
import { CreateEquipmentUseCase } from '@business/useCases/equipment/createEquipmentUseCase';

@injectable()
export class CreateEquipmentOperator extends AbstractOperator<InputCreateEquipment, OutputCreateEquipment> {
  public constructor(@inject(CreateEquipmentUseCase) private createEquipmentUseCase: CreateEquipmentUseCase) {
    super();
  }

  protected async run(input: InputCreateEquipment): Promise<OutputCreateEquipmentDto> {
    return await this.createEquipmentUseCase.exec(input);
  }
}
