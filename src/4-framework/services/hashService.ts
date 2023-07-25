import { IHashService } from '@business/services/iHashService';
import { injectable } from 'inversify';
import * as bcrypt from 'bcrypt';

@injectable()
export class HashService implements IHashService {
  async generateHash(value: string): Promise<string> {
    return await bcrypt.hash(value, 12);
  }

  async compareHash(value: string, hashedValue: string): Promise<boolean> {
    return await bcrypt.compare(value, hashedValue);
  }
}
