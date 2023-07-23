import { container } from '@test/utility/ioc/inversifyConfigTests';
import { InputListEquipmentsDto } from '@business/dto/equipment/listEquipmentsDto';
import { listEquipmentsGeneralError } from '@business/module/errors/equipment/equipment';
import { ListEquipmentsUseCase } from '@business/useCases/equipment/listEquipmentsUseCase';
import { equipmentRepositoryMock } from '@test/utility/mocks/repository/equipment.mock';

describe('2-business.useCases.equipment.listEquipmentsUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(ListEquipmentsUseCase);
  const input: InputListEquipmentsDto = {
    limit: 4,
    page: 1,
  };

  it('should is not be able to list equipments because exception in list all method', async () => {
    jest.spyOn(equipmentRepositoryMock, 'listAll').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(listEquipmentsGeneralError);
  });

  // it('should calls listAll method with correct values', async () => {
  //   const spy = jest.spyOn(equipmentRepositoryMock, 'listAll');

  //   await useCase.exec(input);

  //   expect(spy).toHaveBeenCalledWith(input);
  // });

  // it('should list equipment  on success', async () => {
  //   const result = await useCase.exec(input);

  //   expect(result.isLeft()).toBeFalsy();
  //   expect(result.isRight()).toBeTruthy();
  //   expect(result.value).toHaveProperty('data');
  //   expect(result.value).toHaveProperty('meta', {
  //     hasNext: true,
  //     limit: 1,
  //     page: 1,
  //     total: 2,
  //   });
  // });
});
