import {
  InputCreateEquipmentCategoryDto,
  OutputCreateEquipmentCategoryDto,
} from '@business/dto/equipmentCategoryDto.ts/createEquipmentCategoryDto';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { IUseCase } from '@business/useCases/iUseCase';
import { inject, injectable } from 'inversify';

@injectable()
export class CreateEquipmentCategoryUseCase
  implements IUseCase<InputCreateEquipmentCategoryDto, OutputCreateEquipmentCategoryDto>
{
  constructor(@inject(IEquipmentCategoryRepositoryToken) equipmentCategoryRepository: IEquipmentCategoryRepository) {}

  async exec(input: InputCreateEquipmentCategoryDto): Promise<OutputCreateEquipmentCategoryDto> {
    //const equipmentCategoryAlreadyExists = await this.equipmentCategoryRepository.

    throw new Error('Method not implemented.');
  }
}
