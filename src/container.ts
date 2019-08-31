import "reflect-metadata";

import { Container } from "inversify";

import { DatabaseModule } from "./db/database.module";
import { BotService } from "./bot/botService";
import { D } from "./services/discordClient";
import { CommandService } from "./bot/commandService";
import { Logger } from "./utils/logger";
import { GuildService } from "./bot/guildService";
import { IssueTracker } from "./utils/issueTracker";

export const getContainer = async () => {
    const container = new Container();

    await container.loadAsync(DatabaseModule);

    container.bind(D).toSelf();

    container.bind(Logger).toSelf();
    container.bind(IssueTracker).toSelf();

    container.bind(BotService).toSelf();
    container.bind(CommandService).toSelf();
    container.bind(GuildService).toSelf();

    return container;
};