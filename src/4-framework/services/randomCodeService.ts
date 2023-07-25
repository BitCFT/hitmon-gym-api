import { IRandomCodeService } from '@business/services/iRandomCodeService';
import { injectable } from 'inversify';
import crypto from 'crypto';

@injectable()
export class RandomCodeService implements IRandomCodeService {
  generateCode(length?: number): string {
    const code = crypto
      .randomBytes(length || 4)
      .toString('hex')
      .toLocaleUpperCase()
      .slice(0, 6);

    return code;
  }
}
