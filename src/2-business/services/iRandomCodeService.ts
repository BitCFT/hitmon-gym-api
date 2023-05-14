export const IRandomCodeServiceToken = Symbol.for("IRandomCodeServiceToken");

export interface IRandomCodeService {
  generateCode(length?: number): string;
}
