import { UseCasesModule } from "@framework/ioc/useCasesModule";
import { container } from "@shared/container";
import { FakeServicesModule } from "./fakeServicesModule";
import { FakeRepositoryModule } from "./fakeRepositoryModule";

container.load(UseCasesModule);
container.load(FakeServicesModule);
container.load(FakeRepositoryModule);
