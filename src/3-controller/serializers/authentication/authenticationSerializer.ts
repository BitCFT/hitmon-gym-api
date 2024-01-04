import { AbstractSerializer } from '../abstractSerializer';
import { IsNotEmpty, IsString } from 'class-validator';
import { OutputAuthenticationDto } from '@business/dto/authentication/authenticationDto';

export class InputAuthentication extends AbstractSerializer<InputAuthentication> {
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'password can not be empty' })
  password!: string;
}

export type OutputAuthentication = OutputAuthenticationDto;
