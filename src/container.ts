import "reflect-metadata";

import { Container } from "inversify";

import { DatabaseModule } from "./db/database.module";
import { BotService } from "./bot/botService";
import { D } from "./services/discordClient";
import { DefaultCommandService } from "./bot/defaultCommandService";
import { Logger } from "./utils/logger";
import { GuildService } from "./bot/guildService";
import { IssueTracker } from "./utils/issueTracker";
import { UserService } from "./bot/userService";
import { ChannelService } from "./bot/channelService";

export const getContainer = async () => {
    const container = new Container();

    await container.loadAsync(DatabaseModule);

    container.bind(D).toSelf();

    container.bind(Logger).toSelf();
    container.bind(IssueTracker).toSelf();

    container.bind(BotService).toSelf();
    container.bind(DefaultCommandService).toSelf();
    container.bind(GuildService).toSelf();
    container.bind(UserService).toSelf();
    container.bind(ChannelService).toSelf();

    return container;
};
