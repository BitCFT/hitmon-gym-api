import { inject, injectable } from 'inversify';
import { AbstractOperator } from '../abstractOperator';
import {
  InputDeleteEquipment,
  OutputDeleteEquipment,
} from '@controller/serializers/equipment/deleteEquipmentSerializer';
import { DeleteEquipmentUseCase } from '@business/useCases/equipment/deleteEquipmentUseCase';

@injectable()
export class DeleteEquipmentOperator extends AbstractOperator<InputDeleteEquipment, OutputDeleteEquipment> {
  public constructor(@inject(DeleteEquipmentUseCase) private deleteEquipmentUseCase: DeleteEquipmentUseCase) {
    super();
  }

  protected async run(input: InputDeleteEquipment): Promise<OutputDeleteEquipment> {
    return await this.deleteEquipmentUseCase.exec(input);
  }
}
