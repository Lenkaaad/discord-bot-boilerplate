import { injectable } from "inversify";
import { D } from "../services/discordClient";
import { Logger } from "../utils/logger";
import { DefaultCommandService } from "./defaultCommandService";
import { GuildService } from "./guildService";
import { IssueTracker } from "../utils/issueTracker";
import { ChannelService } from "./channelService";
import { CustomCommandService } from "./customCommandService";

require(`dotenv`).config();

@injectable()
export class BotService {

    private Discord;

    constructor(
        private D: D,
        private issueTracker: IssueTracker,
        private logger: Logger,
        private guildService: GuildService,
        private channelService: ChannelService,
        private defaultCommandService: DefaultCommandService,
        private customCommandService: CustomCommandService
    ) 
    {
        this.logger.init("BotService");
        this.Discord =  D;
    }

    public start() {
        this.logger.info("BotService started running.");
        this.Discord.client.on("ready", () => {
            this.logger.info("DiscordClient is ready.");
        });

        this.issueTracker.start(this.Discord.client);
        this.startMessageHandler();
        this.guildActivityHandler();
        this.disconnectHandler();
    }

    private startMessageHandler() {
        this.Discord.client.on("message", async message => {
            // ignore all messages coming from other bots
            if (message.author.bot) return;

            const prefix = await this.guildService.getPrefix(message.member.guild.id);

            if (prefix && message.content.startsWith(prefix)) {
                const [command, ...args] = message.content.substr(prefix.length + 1).split(" ");
                console.log("Command: ", command, "Args: ", args);
        
                const isAdmin = await this.guildService.isUserAdmin(message.member.guild.id, message.member.id);
                
                if (isAdmin) {
                    this.defaultCommandService.executeCommand(message, command, args);
                }

                const exists = await this.channelService.channelExists(message.channel.id);

                if (exists) {
                    this.logger.info("Channel is whitelisted.");
                    this.customCommandService.executeCommand(message, command, args);
                } else {
                    return;
                }
            }
        })
    }

    private guildActivityHandler() {
        this.Discord.client.on("guildCreate", guild => {
            this.logger.info(`Guild ${guild.id} - ${guild.name} has added bot.`);
            // start guild add db procedure
            this.guildService.createGuild(guild);
        });

        this.Discord.client.on("guildDelete", guild => {
            this.logger.info(`Guild ${guild.id} - ${guild.name} has removed bot`);
            // start guild remove db procedure
            this.guildService.deleteGuild(guild);
        });
    }

    private disconnectHandler() {
        this.Discord.client.on("reconnecting", function(){
            this.logger.alert(`The client tries to reconnect to the WebSocket`);
        });

        this.Discord.client.on("disconnect", () => {
            this.logger.alert("The WebSocket has closed and will no longer attempt to reconnect");
        });
    }
}