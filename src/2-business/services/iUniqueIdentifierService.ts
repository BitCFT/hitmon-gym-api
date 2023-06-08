export const IUniqueIdentifierServiceToken = Symbol.for('IUniqueIdentifierServiceToken');

export interface IUniqueIdentifierService {
  create(): string;
}
