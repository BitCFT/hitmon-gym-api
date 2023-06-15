import { EquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { fakeEquipmentCategory } from '@test/utility/fakes/entities/equipmentCategory';

describe('1-domain.entities.equipmentCategory', () => {
  test('should be able to create a new equipment category', () => {
    const equipmentCategory = EquipmentCategoryEntity.create(fakeEquipmentCategory);

    if (equipmentCategory.isRight()) {
      const equipmentCategoryExported = equipmentCategory.value.export();

      expect(equipmentCategoryExported.name).toBe(fakeEquipmentCategory.name);
    }
  });
});
