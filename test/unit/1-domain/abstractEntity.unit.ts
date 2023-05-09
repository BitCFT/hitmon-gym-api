import {
  FakeAbstractEntity,
  IFakeAbstractEntity,
} from "@test/utility/fakes/entities/abstractEntity";

describe("1-domain.abstractEntity", () => {
  it("should create an entity with empty properties if no props are provided", () => {
    const entity = FakeAbstractEntity.create(null);

    expect(entity.props).toEqual({});
  });

  it("should create an entity with the provided props", () => {
    const props: IFakeAbstractEntity = {
      foo: "string",
    };
    const entity = FakeAbstractEntity.create(props);

    expect(entity.props).toEqual(props);
  });

  it("should export the entity properties", () => {
    const props: IFakeAbstractEntity = {
      foo: "string",
    };
    const entity = FakeAbstractEntity.create(props);

    expect(entity.export()).toEqual(props);
  });

  it("should export the entity properties as json", () => {
    const props: IFakeAbstractEntity = {
      foo: "string",
    };
    const entity = FakeAbstractEntity.create(props);

    expect(entity.exportJson()).toEqual(JSON.stringify(props));
  });
});
