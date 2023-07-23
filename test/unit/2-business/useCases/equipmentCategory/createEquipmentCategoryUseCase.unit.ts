import { container } from '@test/utility/ioc/inversifyConfigTests';
import { CreateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/createEquipmentCategoryUseCase';
import { InputCreateEquipmentCategoryDto } from '@business/dto/equipmentCategory/createEquipmentCategoryDto';
import { equipmentCategoryRepositoryMock } from '@test/utility/mocks/repository/equipmentCategory.mock';
import {
  createEquipmentCategoryGeneralError,
  equipmentCategoryAlreadyInUseError,
} from '@business/module/errors/equipmentCategory/equipmentCategory';
import { EquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { left } from '@shared/either';
import { fakeIError } from '@test/utility/fakes/error/fakeIError';
import { fakeEquipmentCategory } from '@test/utility/fakes/entities/equipmentCategory';

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

  it('should return left if name is already in use', async () => {
    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(equipmentCategoryAlreadyInUseError);
  });

  it('should return left if on create entity returns left', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findByName').mockImplementationOnce(async () => null);
    jest.spyOn(EquipmentCategoryEntity, 'create').mockReturnValueOnce(left(fakeIError));

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(fakeIError);
  });

  it('should calls create equipment category entity with correct values', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findByName').mockImplementationOnce(async () => null);

    const spy = jest.spyOn(EquipmentCategoryEntity, 'create');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith({
      ...input,
      id: '0c5244eb-d80e-452c-bf99-383236161a51',
    });
  });

  it('should is not be able to create equipment category because exception in create method', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findByName').mockImplementationOnce(async () => null);
    jest.spyOn(equipmentCategoryRepositoryMock, 'create').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(createEquipmentCategoryGeneralError);
  });

  it('should calls create method with correct values', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findByName').mockImplementationOnce(async () => null);
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01T00:00:00.000Z'));

    const spy = jest.spyOn(equipmentCategoryRepositoryMock, 'create');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith({
      ...input,
      id: '0c5244eb-d80e-452c-bf99-383236161a51',
    });
  });

  it('should create an equipment category on success', async () => {
    jest.spyOn(equipmentCategoryRepositoryMock, 'findByName').mockImplementationOnce(async () => null);

    const result = await useCase.exec(input);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual(fakeEquipmentCategory);
  });
});
