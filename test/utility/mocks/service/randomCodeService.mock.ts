import { IRandomCodeService } from "@business/services/iRandomCodeService";
import { injectable } from "inversify";

@injectable()
export class RandomCodeServiceMock implements IRandomCodeService {
  generateCode(length?: number | undefined): string {
    return "codeFake";
  }
}
