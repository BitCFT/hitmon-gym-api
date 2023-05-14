export interface IUseCase<I, O> {
  exec(input: I): Promise<O>;
}
