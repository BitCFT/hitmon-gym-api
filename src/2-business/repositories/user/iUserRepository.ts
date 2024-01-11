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

export interface IUserRepository {
  create(input: InputCreateUser): Promise<Omit<IUserEntity, 'password'>>;
  findById(id: string): Promise<OutputFindById>;
  findByEmail(email: string): Promise<OutputFindByEmail>;
  findByAccountVerificationCode(code: string): Promise<OutputFindByAccountVerificationCode>;
  update(id: string, params: Partial<IUserEntity>): Promise<Omit<IUserEntity, 'password'>>;
}
