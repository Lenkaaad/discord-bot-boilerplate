import { AsyncContainerModule } from "inversify";
import { Settings } from "../settings";
import { ORM } from "./orm";
import { ServerRepository } from "./repositories/serverRepository";

export const DatabaseModule = new AsyncContainerModule(async bind => {
    const settings = new Settings();

    const orm = new ORM(settings.DB_URL, settings.SYNCHRONIZE_DB);
    bind(ORM).toConstantValue(orm);

    await orm.connect();

    bind(ServerRepository).toConstantValue(orm.getConnection().getCustomRepository(ServerRepository));

})