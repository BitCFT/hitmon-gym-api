import { container } from "@shared/container";
import { UseCasesModule } from "@framework/ioc/useCasesModule";
import { FakeServicesModule } from "./fakeServicesModule";
import { FakeRepositoriesModule } from "./fakeRepositoriesModule";

container.load(UseCasesModule);

FakeServicesModule(container);
FakeRepositoriesModule(container);

export { container };
