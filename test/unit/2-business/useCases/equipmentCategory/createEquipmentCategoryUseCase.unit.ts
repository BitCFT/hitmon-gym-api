import { container } from '@test/utility/ioc/inversifyConfigTests';
import { CreateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/createEquipmentCategoryUseCase';
import { InputCreateEquipmentCategoryDto } from '@business/dto/equipmentCategoryDto.ts/createEquipmentCategoryDto';
import { equipmentCategoryRepositoryMock } from '@test/utility/mocks/repository/equipementCategory.mock';
import { createEquipmentCategoryGeneralError } from '@business/module/errors/equipmentCategory/equipmentCategory';

describe('2-business.useCases.equipmentCategory.createEquipmentCategoryUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(CreateEquipmentCategoryUseCase);
  const input: InputCreateEquipmentCategoryDto = {
    name: 'legs',
  };

  it('should is not be able to create equipment category because exception in findByName method', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findByName').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(createEquipmentCategoryGeneralError);
  });

  it('should calls findByName method with correct value', async () => {
    const spy = jest.spyOn(equipmentCategoryRepositoryMock, 'findByName');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.name);
  });
});
