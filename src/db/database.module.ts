import { AsyncContainerModule } from "inversify";
import { Settings } from "../settings";
import { ORM } from "./orm";
import { ServerRepository } from "./repositories/serverRepository";
import { UserRepository } from "./repositories/userRepository";
import { ChannelRepository } from "./repositories/channelRepository";

export const DatabaseModule = new AsyncContainerModule(async bind => {
    const settings = new Settings();

    const orm = new ORM(settings.DB_URL, settings.SYNCHRONIZE_DB);
    bind(ORM).toConstantValue(orm);

    await orm.connect();

    bind(ServerRepository).toConstantValue(orm.getConnection().getCustomRepository(ServerRepository));
    bind(UserRepository).toConstantValue(orm.getConnection().getCustomRepository(UserRepository));
    bind(ChannelRepository).toConstantValue(orm.getConnection().getCustomRepository(ChannelRepository));

})