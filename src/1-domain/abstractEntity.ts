export abstract class AbstractEntity<T> {
  public readonly props: T;

  protected constructor(props: T) {
    if (!props) {
      props = {} as T;
    }
    this.props = props;
  }

  public export(): T {
    return { ...this.props };
  }

  public exportJson(): string {
    return JSON.stringify(this.props);
  }
}
