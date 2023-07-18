import { container } from '@test/utility/ioc/inversifyConfigTests';
import { equipmentCategoryRepositoryMock } from '@test/utility/mocks/repository/equipementCategory.mock';
import {
  deleteEquipmentCategoryGeneralError,
  equipmentCategoryIsNotFoundError,
} from '@business/module/errors/equipmentCategory/equipmentCategory';
import { DeleteEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/deleteEquipmentCategoryUseCase';
import { InputDeleteEquipmentCategoryDto } from '@business/dto/equipmentCategoryDto.ts/deleteEquipmentCategoryDto';

describe('2-business.useCases.equipmentCategory.deleteEquipmentCategoryUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(DeleteEquipmentCategoryUseCase);
  const input: InputDeleteEquipmentCategoryDto = {
    id: 'string',
  };

  it('should is not be able to delete equipment category because exception in findById method', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findById').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(deleteEquipmentCategoryGeneralError('mocked error'));
  });

  it('should calls findById method with correct value', async () => {
    const spy = jest.spyOn(equipmentCategoryRepositoryMock, 'findById');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.id);
  });

  it('should return left if equipmentCategory is not found', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findById').mockResolvedValueOnce(null);

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(equipmentCategoryIsNotFoundError);
  });

  it('should is not be able to update equipment category because exception in delete method', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'delete').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(deleteEquipmentCategoryGeneralError('mocked error'));
  });

  it('should calls delete method with correct value', async () => {
    const spy = jest.spyOn(equipmentCategoryRepositoryMock, 'delete');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.id);
  });

  it('should delete an equipment category on success', async () => {
    const result = await useCase.exec(input);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual(undefined);
  });
});
