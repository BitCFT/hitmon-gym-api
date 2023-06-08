import { AbstractEntity } from '@domain/abstractEntity';

export interface IFakeAbstractEntity {
  foo?: string;
}
export type FakeAbstractEntityType = IFakeAbstractEntity | null;

export class FakeAbstractEntity extends AbstractEntity<FakeAbstractEntityType> {
  static create(props: FakeAbstractEntityType) {
    if (!props) {
      const abstractEntity = new FakeAbstractEntity(props);
      return abstractEntity;
    }

    const abstractEntity = new FakeAbstractEntity({
      ...props,
    });
    return abstractEntity;
  }
}
