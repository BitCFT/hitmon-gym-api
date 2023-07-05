import { container } from '@test/utility/ioc/inversifyConfigTests';
import { equipmentCategoryRepositoryMock } from '@test/utility/mocks/repository/equipementCategory.mock';
import { listEquipmentCategoriesGeneralError } from '@business/module/errors/equipmentCategory/equipmentCategory';
import { ListEquipmentCategoriesUseCase } from '@business/useCases/equipmentCategory/listEquipmentCategoriesUseCase';
import { InputListEquipmentCategoriesDto } from '@business/dto/equipmentCategoryDto.ts/listEquipmentCategoriesDto';

describe('2-business.useCases.equipmentCategory.listEquipmentCategoriesUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(ListEquipmentCategoriesUseCase);
  const input: InputListEquipmentCategoriesDto = {
    limit: 4,
    page: 1,
  };

  it('should is not be able to list equipment categories because exception in list all method', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'listAll').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(listEquipmentCategoriesGeneralError);
  });
});
