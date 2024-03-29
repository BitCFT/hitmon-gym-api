import {
  IUserRepository,
  InputCreateUser,
  OutputFindByAccountVerificationCode,
  OutputFindByEmail,
  OutputFindById,
} from '@business/repositories/user/iUserRepository';
import { IUserEntity } from '@domain/entities/userEntity';
import { prismaClient } from '@framework/database/prisma/prismaClient';
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
      include: { roles: true },
    });

    return this.mapper(user);
  }

  async findById(id: string): Promise<OutputFindById> {
    const user = await prismaClient.user.findUnique({ where: { id }, include: { roles: true } });

    return user ? this.mapper(user) : null;
  }

  async findByEmail(email: string): Promise<OutputFindByEmail> {
    const user = await prismaClient.user.findUnique({ where: { email }, include: { roles: true } });

    return user ? this.mapperWithPassword(user) : null;
  }

  async findByAccountVerificationCode(code: string): Promise<OutputFindByAccountVerificationCode> {
    const user = await prismaClient.user.findFirst({ where: { accountVerificationCode: code } });

    return user ? this.mapper(user) : null;
  }

  async update(id: string, params: Partial<IUserEntity>): Promise<Omit<IUserEntity, 'password'>> {
    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: params as any,
    });

    return this.mapper(updatedUser);
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
      ...(data.roles && { roles: data.roles }),
    };
  }

  private mapperWithPassword(data: any): IUserEntity {
    return {
      id: data?.id,
      email: data?.email,
      userName: data?.userName,
      password: data.password,
      registrationStep: data?.registrationStep,
      ...(data?.accountVerificationCode && { accountVerificationCode: data.accountVerificationCode }),
      ...(data?.accountVerificationCodeExpiresAt && {
        accountVerificationCodeExpiresAt: data.accountVerificationCodeExpiresAt,
      }),
      ...(data?.passwordResetCode && { passwordResetCode: data.passwordResetCode }),
      ...(data?.passwordResetCodeExpiresAt && { passwordResetCodeExpiresAt: data.passwordResetCodeExpiresAt }),
      ...(data.createdAt && { createdAt: data.createdAt }),
      ...(data.updatedAt && { updatedAt: data.updatedAt }),
      ...(data.roles && { roles: data.roles }),
    };
  }
}
