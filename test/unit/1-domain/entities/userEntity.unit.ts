import { UserEntity } from '@domain/entities/userEntity';
import { fakeUserEntity } from '@test/utility/fakes/entities/userEntity';

describe('1-domain.entities.userEntity', () => {
  test('should be able to create a new user', () => {
    const userEntity = UserEntity.create(fakeUserEntity);

    if (userEntity.isRight()) {
      const userEntityExported = userEntity.value.export();

      expect(userEntityExported.userName).toBe(fakeUserEntity.userName);
    }
  });
});
