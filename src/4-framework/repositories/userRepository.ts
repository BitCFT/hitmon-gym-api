import {
  IUserRepository,
  InputCreateUser,
  OutputFindByAccountVerificationCode,
  OutputFindByEmail,
  OutputFindById,
} from '@business/repositories/user/iUserRepository';
import { IUserEntity } from '@domain/entities/userEntity';
import { prismaClient } from '@framework/prisma/prismaClient';
import { injectable } from 'inversify';

@injectable()
export class UserRepository implements IUserRepository {
  async create(input: InputCreateUser): Promise<Omit<IUserEntity, 'password'>> {
    const studentRole = await prismaClient.role.findUnique({ where: { type: 'STUDENT' } });
    const user = await prismaClient.user.create({
      data: {
        ...input,
        roles: {
          connect: {
            id: studentRole?.id,
          },
        },
      },
      include: {roles: true}
    });

    return this.mapper(user);
  }

  findById(id: string): Promise<OutputFindById> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<OutputFindByEmail> {
    const user = await prismaClient.user.findUnique({ where: { email } });

    return user ? this.mapper(user) : null;
  }

  findByAccountVerificationCode(code: string): Promise<OutputFindByAccountVerificationCode> {
    throw new Error('Method not implemented.');
  }

  update(id: string, params: Partial<IUserEntity>): Promise<IUserEntity> {
    throw new Error('Method not implemented.');
  }

  private mapper(data: any): Omit<IUserEntity, 'password'> {
    return {
      id: data?.id,
      email: data?.email,
      userName: data?.userName,
      registrationStep: data?.registrationStep,
      ...(data?.accountVerificationCode && { accountVerificationCode: data.accountVerificationCode }),
      ...(data?.accountVerificationCodeExpiresAt && {
        accountVerificationCodeExpiresAt: data.accountVerificationCodeExpiresAt,
      }),
      ...(data?.passwordResetCode && { passwordResetCode: data.passwordResetCode }),
      ...(data?.passwordResetCodeExpiresAt && { passwordResetCodeExpiresAt: data.passwordResetCodeExpiresAt }),
      ...(data.createdAt && { createdAt: data.createdAt }),
      ...(data.updatedAt && { updatedAt: data.updatedAt }),
      ...(data.roles && {roles: data.roles})
    };
  }
}
