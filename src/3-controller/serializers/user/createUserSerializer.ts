import { OutputCreateUserDto } from '@business/dto/user/createUserDto';
import { AbstractSerializer } from '../abstractSerializer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class InputCreateUser extends AbstractSerializer<InputCreateUser> {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @IsNotEmpty({ message: 'password can not be empty' })
  password!: string;

  @IsNotEmpty({ message: 'username can not be empty' })
  @Matches(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
    message: 'invalid username.',
  })
  @MinLength(8)
  @MaxLength(20)
  userName!: string;
}

export type OutputCreateUser = OutputCreateUserDto;
