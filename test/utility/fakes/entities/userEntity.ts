import { IUserEntity, RegistrationStep } from '@domain/entities/userEntity';

export const fakeUserEntity: IUserEntity = {
  id: 'string',
  email: 'string',
  password: 'string',
  registrationStep: RegistrationStep.PENDING,
  userName: 'string',
};
