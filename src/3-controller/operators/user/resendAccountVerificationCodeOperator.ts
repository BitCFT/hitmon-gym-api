import { inject, injectable } from "inversify";
import { AbstractOperator } from "../abstractOperator";
import { InputResendAccountVerificationCode, OutputResendAccountVerificationCode } from "@controller/serializers/user/resendAccountVerificationCodeSerializer";
import { ResendAccountVerificationCodeUseCase } from "@business/useCases/user/resendAccountVerificationCodeUseCase";

@injectable()
export class ResendAccountVerificationCodeOperator extends AbstractOperator<InputResendAccountVerificationCode, OutputResendAccountVerificationCode> {
  public constructor(@inject(ResendAccountVerificationCodeUseCase) private resendAccountVerificationCodeUseCase: ResendAccountVerificationCodeUseCase) {
    super();
  }

  protected async run(input: InputResendAccountVerificationCode): Promise<OutputResendAccountVerificationCode> {
    return await this.resendAccountVerificationCodeUseCase.exec(input);
  }
}