import { IUserEntity, RegistrationStep } from '@domain/entities/userEntity';

export const IUserRepositoryToken = Symbol.for('IUserRepositoryToken');

export type OutputFindById = Omit<IUserEntity, 'password'> | null;
export type OutputFindByEmail = IUserEntity | null;
export type InputCreateUser = {
  id: string;
  email: string;
  password: string;
  userName: string;
  registrationStep: RegistrationStep;
  accountVerificationCode: string;
  accountVerificationCodeExpiresAt: Date;
};
export type OutputFindByAccountVerificationCode = Omit<IUserEntity, 'password'> | null;
