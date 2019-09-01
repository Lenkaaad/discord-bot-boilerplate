import { injectable } from "inversify";
import { Logger } from "../utils/logger";
import { GuildService } from "./guildService";
import { UserService } from "./userService";
import { ChannelService } from "./channelService";

@injectable()
export class DefaultCommandService {
    constructor(
        private logger: Logger,
        private guildService: GuildService,
        private userService: UserService,
        private channelService: ChannelService
    ) {
        this.logger.init("CommandService");
    }

    public executeCommand(messageData: any, command: string, args: [string]) {
        switch (command) {
            case "setAdmin":
                this.logger.warning("Admin request.");
                this.setAdmin(messageData.mentions, messageData.member.guild.id);
                break;
            case "setPrefix":
                this.logger.warning("Prefix request.");
                this.setPrefix(messageData.member.guild.id, args[0]);
                break;
            case "initMe":
                this.logger.warning("User init request.");
                this.initUser(messageData.member, messageData.member.guild.id);
                break;
            case "initChannel":
                this.logger.warning("Channel init request.")
                this.initChannel(messageData.channel, messageData.member.guild.id);
                break;
            case "removeChannel":
                this.logger.warning("Channel remove request.");
                this.removeChannel(messageData.channel);
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

    private async initUser(user: any, guildId: string) {
        await this.userService.createUser(user, guildId);
    }

    private async initChannel(channel: any, guildId: string) {
        await this.channelService.createChannel(channel, guildId);
    }

    private async removeChannel(channel: any) {
        await this.channelService.deleteChannel(channel);
    }
}