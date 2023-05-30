import { IHashService } from "@business/services/iHashService";
import { injectable } from "inversify";

// export const HashServiceMock: IHashService = {
//   generateHash: jest.fn().mockResolvedValue("hash"),
//   compareHash: jest.fn().mockResolvedValue(true),
// };

@injectable()
export class HashServiceMock implements IHashService {
  async generateHash(value: string): Promise<string> {
    return "hash";
  }

  async compareHash(value: string, hashedValue: string): Promise<boolean> {
    return true;
  }
}
