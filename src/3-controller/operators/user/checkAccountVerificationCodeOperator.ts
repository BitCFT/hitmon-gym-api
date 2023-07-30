import { inject, injectable } from "inversify";
import { AbstractOperator } from "../abstractOperator";
import { InputCheckAccountVerificationCode, OutputCheckAccountVerificationCode } from "@controller/serializers/user/checkAccountVerificationCodeSerializer";
import { CheckAccountVerificationCodeUseCase } from "@business/useCases/user/checkAccountVerificationCodeUseCase";

@injectable()
export class CheckAccountVerificationCodeOperator extends AbstractOperator<InputCheckAccountVerificationCode, OutputCheckAccountVerificationCode> {
  public constructor(@inject(CheckAccountVerificationCodeUseCase) private checkAccountVerificationCodeUseCase: CheckAccountVerificationCodeUseCase) {
    super();
  }

  protected async run(input: InputCheckAccountVerificationCode): Promise<OutputCheckAccountVerificationCode> {
    return await this.checkAccountVerificationCodeUseCase.exec(input);
  }
}