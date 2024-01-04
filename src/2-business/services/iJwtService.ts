export const IJwtServiceToken = Symbol.for('IJwtServiceToken');

export interface IJwtService {
  sign(payload: any): Promise<string>;
  verify(token: string): Promise<boolean>;
}
