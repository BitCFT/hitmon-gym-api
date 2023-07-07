import { validationError } from '@business/module/errors/validation';
import { ValidationError, validateSync } from 'class-validator';
import { injectable } from 'inversify';

export abstract class Validatable<A> {
  constructor(obj: Partial<A>) {
    Object.assign(this, obj);
  }

  isValid() {
    const errors = this.errors();
    return !errors || errors.length === 0;
  }

  validate() {
    const errors = this.errors();
    if (errors && errors.length > 0) {
      throw errors;
    }
  }

  errors() {
    return validateSync(this);
  }
}

@injectable()
export abstract class AbstractOperator<I, O> {
  protected abstract run(input?: Validatable<I>): Promise<O>;

  public async exec(input?: Validatable<I>): Promise<O> {
    try {
      if (input) {
        input.validate();
      }
      return this.run(input);
    } catch (err) {
      if (err instanceof Array && err.length && err[0] instanceof ValidationError) {
        const data = err.map(i => ({
          property: i.property,
          constraints: i.constraints,
        }));
        throw validationError(data);
      }
      throw err;
    }
  }
}
