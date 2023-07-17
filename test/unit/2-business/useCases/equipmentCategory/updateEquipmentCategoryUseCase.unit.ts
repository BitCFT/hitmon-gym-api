import { container } from '@test/utility/ioc/inversifyConfigTests';
import { equipmentCategoryRepositoryMock } from '@test/utility/mocks/repository/equipementCategory.mock';
import {
  equipmentCategoryAlreadyInUseError,
  equipmentCategoryIsNotFoundError,
  updateEquipmentCategoryGeneralError,
} from '@business/module/errors/equipmentCategory/equipmentCategory';
import { EquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { left } from '@shared/either';
import { fakeIError } from '@test/utility/fakes/error/fakeIError';
import { fakeEquipmentCategory } from '@test/utility/fakes/entities/equipmentCategory';
import { UpdateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/updateEquipmentCategoryUseCase';
import { InputUpdateEquipmentCategoryDto } from '@business/dto/equipmentCategoryDto.ts/updateEquipmentCategoryDto';

describe('2-business.useCases.equipmentCategory.updateEquipmentCategoryUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(UpdateEquipmentCategoryUseCase);
  const input: InputUpdateEquipmentCategoryDto = {
    id: 'string',
    params: {
      name: 'arms',
      description: 'head exercises',
    },
  };

  it('should is not be able to update equipment category because exception in findById method', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findById').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(updateEquipmentCategoryGeneralError);
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

  it('should is not be able to update equipment category because exception in findByName method', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findByName').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(updateEquipmentCategoryGeneralError);
  });

  it('should calls findByName method with correct value', async () => {
    const spy = jest.spyOn(equipmentCategoryRepositoryMock, 'findByName');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.params.name);
  });

  it('should return left if equipmentCategory is already in use', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findByName').mockResolvedValueOnce({
      ...fakeEquipmentCategory,
      name: 'head',
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(equipmentCategoryAlreadyInUseError);
  });

  it('should is not be able to update equipment category because exception in update method', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'update').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(updateEquipmentCategoryGeneralError);
  });

  // it('should is not be able to create equipment category because exception in create method', async () => {
  //   jest.spyOn(equipmentCategoryRepositoryMock, 'findByName').mockImplementationOnce(async () => null);
  //   jest.spyOn(equipmentCategoryRepositoryMock, 'create').mockImplementationOnce(() => {
  //     throw new Error('mocked error');
  //   });

  //   const result = await useCase.exec(input);

  //   expect(result.isRight()).toBeFalsy();
  //   expect(result.isLeft()).toBeTruthy();
  //   expect(result.value).toEqual(createEquipmentCategoryGeneralError);
  // });

  // it('should calls create method with correct values', async () => {
  //   jest.spyOn(equipmentCategoryRepositoryMock, 'findByName').mockImplementationOnce(async () => null);
  //   jest.useFakeTimers().setSystemTime(new Date('2023-01-01T00:00:00.000Z'));

  //   const spy = jest.spyOn(equipmentCategoryRepositoryMock, 'create');

  //   await useCase.exec(input);

  //   expect(spy).toHaveBeenCalledWith({
  //     ...input,
  //     id: '0c5244eb-d80e-452c-bf99-383236161a51',
  //   });
  // });

  // it('should create an equipment category on success', async () => {
  //   jest.spyOn(equipmentCategoryRepositoryMock, 'findByName').mockImplementationOnce(async () => null);

  //   const result = await useCase.exec(input);

  //   expect(result.isLeft()).toBeFalsy();
  //   expect(result.isRight()).toBeTruthy();
  //   expect(result.value).toEqual(fakeEquipmentCategory);
  // });
});
