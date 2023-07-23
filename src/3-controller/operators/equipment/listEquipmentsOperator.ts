import { inject, injectable } from 'inversify';
import { AbstractOperator } from '../abstractOperator';
import { InputListEquipments, OutputListEquipments } from '@controller/serializers/equipment/listEquipmentsSerializer';
import { ListEquipmentsUseCase } from '@business/useCases/equipment/listEquipmentsUseCase';

@injectable()
export class ListEquipmentsOperator extends AbstractOperator<InputListEquipments, OutputListEquipments> {
  public constructor(@inject(ListEquipmentsUseCase) private listEquipmentsUseCase: ListEquipmentsUseCase) {
    super();
  }

  protected async run(input: InputListEquipments): Promise<OutputListEquipments> {
    return await this.listEquipmentsUseCase.exec(input);
  }
}
