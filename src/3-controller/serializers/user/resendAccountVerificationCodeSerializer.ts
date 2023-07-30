import { OutputResendAccountVerificationCodeDto } from "@business/dto/user/resendAccountVerificationCodeDto";
import { AbstractSerializer } from "../abstractSerializer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class InputResendAccountVerificationCode extends AbstractSerializer<InputResendAccountVerificationCode> {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export type OutputResendAccountVerificationCode = OutputResendAccountVerificationCodeDto 