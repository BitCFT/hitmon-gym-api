import { RoleEntity } from '@domain/entities/roleEntity';
import { fakeRoleEntity } from '@test/utility/fakes/entities/roleEntity';

describe('1-domain.entities.roleEntity', () => {
  test('should be able to create a new role', () => {
    const roleEntity = RoleEntity.create(fakeRoleEntity);

    if (roleEntity.isRight()) {
      const roleEntityExported = roleEntity.value.export();

      expect(roleEntityExported.description).toBe(fakeRoleEntity.description);
    }
  });
});
