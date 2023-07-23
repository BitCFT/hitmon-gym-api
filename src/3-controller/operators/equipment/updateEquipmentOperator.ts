import {
  InputUpdateEquipment,
  OutputUpdateEquipment,
} from '@controller/serializers/equipment/updateEquipmentSerializer';
import { AbstractOperator } from '../abstractOperator';
import { inject, injectable } from 'inversify';
import { UpdateEquipmentUseCase } from '@business/useCases/equipment/updateEquipmentUseCase';

@injectable()
export class UpdateEquipmentOperator extends AbstractOperator<InputUpdateEquipment, OutputUpdateEquipment> {
  public constructor(@inject(UpdateEquipmentUseCase) private updateEquipmentUseCase: UpdateEquipmentUseCase) {
    super();
  }

  protected async run(input: InputUpdateEquipment): Promise<OutputUpdateEquipment> {
    return await this.updateEquipmentUseCase.exec(input);
  }
}
