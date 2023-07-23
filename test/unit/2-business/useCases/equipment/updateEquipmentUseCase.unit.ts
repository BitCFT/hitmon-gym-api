import { container } from '@test/utility/ioc/inversifyConfigTests';
import { equipmentRepositoryMock } from '@test/utility/mocks/repository/equipment.mock';
import {
  equipmentAlreadyInUseError,
  equipmentIsNotFoundError,
  updateEquipmentGeneralError,
} from '@business/module/errors/equipment/equipment';
import { fakeEquipment } from '@test/utility/fakes/entities/equipment';
import { UpdateEquipmentUseCase } from '@business/useCases/equipment/updateEquipmentUseCase';
import { InputUpdateEquipmentDto } from '@business/dto/equipment/updateEquipmentDto';
import { equipmentCategoryIsNotFoundError } from '@business/module/errors/equipmentCategory/equipmentCategory';
import { equipmentCategoryRepositoryMock } from '@test/utility/mocks/repository/equipmentCategory.mock';

describe('2-business.useCases.equipment.updateEquipmentUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(UpdateEquipmentUseCase);
  const input: InputUpdateEquipmentDto = {
    id: 'string',
    params: {
      name: 'arms',
      categoryId: 'string',
      price: 132,
    },
  };

  it('should is not be able to update equipment because exception in findById method', async () => {
    jest.spyOn(equipmentRepositoryMock, 'findById').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(updateEquipmentGeneralError);
  });

  it('should calls findById method with correct value', async () => {
    const spy = jest.spyOn(equipmentRepositoryMock, 'findById');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.id);
  });

  it('should return left if equipment is not found', async () => {
    jest.spyOn(equipmentRepositoryMock, 'findById').mockResolvedValueOnce(null);

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(equipmentIsNotFoundError);
  });

  it('should is not be able to update equipment because exception in findByName method', async () => {
    jest.spyOn(equipmentRepositoryMock, 'findByName').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(updateEquipmentGeneralError);
  });

  it('should calls findByName method with correct value', async () => {
    const spy = jest.spyOn(equipmentRepositoryMock, 'findByName');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.params.name);
  });

  it('should return left if equipment is already in use', async () => {
    jest.spyOn(equipmentRepositoryMock, 'findByName').mockResolvedValueOnce({
      ...fakeEquipment,
      name: 'head',
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(equipmentAlreadyInUseError);
  });

  it('should is not be able to update equipment because exception in findById method', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findById').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(updateEquipmentGeneralError);
  });

  it('should calls findById method with correct value', async () => {
    const spy = jest.spyOn(equipmentCategoryRepositoryMock, 'findById');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.params.categoryId);
  });

  // it('should return left if equipment is already in use', async () => {
  //   jest.spyOn(equipmentRepositoryMock, 'findByName').mockResolvedValueOnce({
  //     ...fakeEquipment,
  //     name: 'head',
  //   });

  //   const result = await useCase.exec(input);

  //   expect(result.isRight()).toBeFalsy();
  //   expect(result.isLeft()).toBeTruthy();
  //   expect(result.value).toEqual(equipmentAlreadyInUseError);
  // });

  // it('should is not be able to update equipment  because exception in update method', async () => {
  //   jest.spyOn(equipmentRepositoryMock, 'update').mockImplementationOnce(() => {
  //     throw new Error('mocked error');
  //   });

  //   const result = await useCase.exec(input);

  //   expect(result.isRight()).toBeFalsy();
  //   expect(result.isLeft()).toBeTruthy();
  //   expect(result.value).toEqual(updateEquipmentGeneralError);
  // });

  // it('should calls update method with correct value', async () => {
  //   const spy = jest.spyOn(equipmentRepositoryMock, 'update');

  //   await useCase.exec(input);

  //   expect(spy).toHaveBeenCalledWith({
  //     id: input.id,
  //     params: input.params,
  //   });
  // });

  // it('should update an equipment  on success', async () => {
  //   const result = await useCase.exec(input);

  //   expect(result.isLeft()).toBeFalsy();
  //   expect(result.isRight()).toBeTruthy();
  //   expect(result.value).toEqual(fakeEquipment);
  // });
});
