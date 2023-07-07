import { IUniqueIdentifierService } from '@business/services/iUniqueIdentifierService';
import { injectable } from 'inversify';
import { v4 as uuid } from 'uuid';

@injectable()
export class UniqueIdentifierService implements IUniqueIdentifierService {
  create(): string {
    return uuid();
  }
}
