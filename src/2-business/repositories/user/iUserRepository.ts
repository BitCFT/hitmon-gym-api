import { IUserEntity } from '@domain/entities/userEntity';
import { InputCreateUser, OutputFindByAccountVerificationCode, OutputFindByEmail, OutputFindById } from './types';

export interface IUserRepository {
  create(input: InputCreateUser): Promise<Omit<IUserEntity, 'password'>>;
  findById(id: string): Promise<OutputFindById>;
  findByEmail(email: string): Promise<OutputFindByEmail>;
  findByAccountVerificationCode(code: string): Promise<OutputFindByAccountVerificationCode>;
  update(id: string, params: Partial<IUserEntity>): Promise<Omit<IUserEntity, 'password'>>;
}
