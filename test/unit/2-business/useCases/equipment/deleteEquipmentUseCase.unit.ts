import { container } from '@test/utility/ioc/inversifyConfigTests';
import { equipmentRepositoryMock } from '@test/utility/mocks/repository/equipment.mock';
import { DeleteEquipmentGeneralError, EquipmentIsNotFoundError } from '@business/module/errors/equipment/equipment';
import { DeleteEquipmentUseCase } from '@business/useCases/equipment/deleteEquipmentUseCase';
import { InputDeleteEquipmentDto } from '@business/dto/equipment/deleteEquipmentDto';

describe('2-business.useCases.equipment.deleteEquipmentUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(DeleteEquipmentUseCase);
  const input: InputDeleteEquipmentDto = {
    id: 'string',
  };

  it('should is not be able to delete equipment  because exception in findById method', async () => {
    jest.spyOn(equipmentRepositoryMock, 'findById').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(DeleteEquipmentGeneralError);
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
    expect(result.value).toEqual(EquipmentIsNotFoundError);
  });

  it('should is not be able to update equipment  because exception in delete method', async () => {
    jest.spyOn(equipmentRepositoryMock, 'delete').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(DeleteEquipmentGeneralError);
  });

  it('should calls delete method with correct value', async () => {
    const spy = jest.spyOn(equipmentRepositoryMock, 'delete');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.id);
  });

  it('should delete an equipment  on success', async () => {
    const result = await useCase.exec(input);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual(undefined);
  });
});
