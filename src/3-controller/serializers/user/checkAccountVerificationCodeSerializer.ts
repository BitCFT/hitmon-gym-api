import { OutputCheckAccountVerificationCodeDto } from "@business/dto/user/checkAccountVerificationCodeDto";
import { AbstractSerializer } from "../abstractSerializer";
import { IsNotEmpty, Length } from "class-validator";

export class InputCheckAccountVerificationCode extends AbstractSerializer<InputCheckAccountVerificationCode> {
  @IsNotEmpty()
  @Length(6, 6)
  code!: string;
}

export type OutputCheckAccountVerificationCode = OutputCheckAccountVerificationCodeDto 