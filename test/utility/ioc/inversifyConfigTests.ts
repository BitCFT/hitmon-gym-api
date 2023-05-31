import { container } from "@shared/container";
import { UseCasesModule } from "@framework/ioc/useCasesModule";
import { FakeServicesModule } from "./fakeServicesModule";
import { FakeRepositoryModule } from "./fakeRepositoryModule";

container.load(UseCasesModule);

FakeServicesModule(container);
FakeRepositoryModule(container);

export { container };
