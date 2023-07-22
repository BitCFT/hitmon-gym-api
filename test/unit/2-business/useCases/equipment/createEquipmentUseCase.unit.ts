import { container } from '@test/utility/ioc/inversifyConfigTests';
import { CreateEquipmentUseCase } from '@business/useCases/equipment/createEquipmentUseCase';
import { InputCreateEquipmentDto } from '@business/dto/equipment/createEquipmentDto';
import { equipmentRepositoryMock } from '@test/utility/mocks/repository/equipment.mock';
import { createEquipmentGeneralError, equipmentAlreadyInUseError } from '@business/module/errors/equipment/equipment';
import { equipmentCategoryRepositoryMock } from '@test/utility/mocks/repository/equipmentCategory.mock';
import { equipmentCategoryIsNotFoundError } from '@business/module/errors/equipmentCategory/equipmentCategory';
import { EquipmentEntity } from '@domain/entities/equipmentEntity';
import { left } from '@shared/either';
import { fakeIError } from '@test/utility/fakes/error/fakeIError';

describe('2-business.useCases.equipment.createEquipmentUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(CreateEquipmentUseCase);
  const input: InputCreateEquipmentDto = {
    name: 'string',
    price: 100,
    categoryId: 'string',
  };

  it('should is not be able to create equipment because exception in findByName method', async () => {
    jest.spyOn(equipmentRepositoryMock, 'findByName').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(createEquipmentGeneralError);
  });

  it('should calls findByName method with correct value', async () => {
    const spy = jest.spyOn(equipmentRepositoryMock, 'findByName');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.name);
  });

  it('should return left if name is already in use', async () => {
    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(equipmentAlreadyInUseError);
  });

  it('should is not be able to create equipment because exception in findById method', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findById').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(createEquipmentGeneralError);
  });

  it('should calls findById method with correct value', async () => {
    const spy = jest.spyOn(equipmentCategoryRepositoryMock, 'findById');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.categoryId);
  });

  it('should return left if name is already in use', async () => {
    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(equipmentAlreadyInUseError);
  });

  it('should return left if equipment category is not found', async () => {
    jest.spyOn(equipmentRepositoryMock, 'findByName').mockImplementationOnce(async () => null);
    jest.spyOn(equipmentCategoryRepositoryMock, 'findById').mockImplementationOnce(async () => null);

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(equipmentCategoryIsNotFoundError);
  });

  it('should return left if on create entity returns left', async () => {
    jest.spyOn(equipmentRepositoryMock, 'findByName').mockImplementationOnce(async () => null);
    jest.spyOn(EquipmentEntity, 'create').mockReturnValueOnce(left(fakeIError));

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(fakeIError);
  });

  it('should calls create equipment entity with correct values', async () => {
    jest.spyOn(equipmentRepositoryMock, 'findByName').mockImplementationOnce(async () => null);

    const spy = jest.spyOn(EquipmentEntity, 'create');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith({
      ...input,
      id: '0c5244eb-d80e-452c-bf99-383236161a51',
    });
  });

  it('should is not be able to create equipment because exception in create method', async () => {
    jest.spyOn(equipmentRepositoryMock, 'findByName').mockImplementationOnce(async () => null);
    jest.spyOn(equipmentRepositoryMock, 'create').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(createEquipmentGeneralError);
  });

  it('should calls create method with correct values', async () => {
    jest.spyOn(equipmentRepositoryMock, 'findByName').mockImplementationOnce(async () => null);
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01T00:00:00.000Z'));

    const spy = jest.spyOn(equipmentRepositoryMock, 'create');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith({
      ...input,
      id: '0c5244eb-d80e-452c-bf99-383236161a51',
    });
  });

  // it('should create an equipment  on success', async () => {
  //   jest.spyOn(equipmentRepositoryMock, 'findByName').mockImplementationOnce(async () => null);

  //   const result = await useCase.exec(input);

  //   expect(result.isLeft()).toBeFalsy();
  //   expect(result.isRight()).toBeTruthy();
  //   expect(result.value).toEqual(fakeEquipment);
  // });
});
