import { injectable } from "inversify";
import { Logger } from "../utils/logger";
import { GuildService } from "./guildService";

@injectable()
export class DefaultCommandService {
    constructor(
        private logger: Logger,
        private guildService: GuildService
    ) {
        this.logger.init("CommandService");
    }

    public executeCommand(messageData: any, command: string, args: [string]) {
        switch (command) {
            case "setAdmin":
                this.logger.warning("User requests new admin.");
                this.setAdmin(messageData.mentions, messageData.member.guild.id);
                break;
            case "setPrefix":
                this.logger.warning("User requests new prefix.");
                this.setPrefix(messageData.member.guild.id, args[0]);
            default:
                break;
        }
    }

    private async setPrefix(guildId: string, prefix: string) {
        if (prefix === "" || prefix === " ") {
            this.logger.error("Invalid prefix for setAdmin command");
            return;
        }

        await this.guildService.setPrefix(guildId, prefix);
    }

    private async setAdmin(mentions: any, guildId: string) {
        if (mentions.everyone) {
            this.logger.error("Invalid tag for setAdmin command");
            return;
        }

        const tagged = mentions.users.map(item => item.id);

        if (mentions.users.length > 1) {
            this.logger.warning("More than 1 tag added. Ignoring all except first.");
        }

        await this.guildService.setAdmin(guildId, tagged[0]);
    }
}