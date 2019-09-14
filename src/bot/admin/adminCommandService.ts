import { injectable } from "inversify";
import { Logger } from "../../utils/logger";
import { config } from "../../../botConfig";

@injectable()
export class AdminCommandService {
    constructor(
        private logger: Logger
    ){
        this.logger.init("AdminCommandService");
    }

    public executeCommand(messageData: any, command: string, args: [string]) {
        switch (command) {
            case "kick":
                this.kick(messageData);
                break;
            case "ban":
                this.ban(messageData);
                break;
            case "silence":
                this.silence(args);
                // silence user
            default:
                break;
        }
    }

    private async kick(messageData: any) {
        const member = messageData.mentions.members.first();
        if (member.kickable) {
            const kicked = await member.kick();

            if (kicked) {
                if (config.admin.kickMessage) {
                    const message = config.admin.kickMessage.replace("{USERNAME}", member.displayName);
                    messageData.channel.send(message);
                }
            } else {
                this.logger.error(`Could not kick member: ${member.id}`);
                // TODO: message author privately to log error
            }
        } else {
            this.logger.error(`Could not kick non-kickable member: ${member.id}`);
        }
    }

    private async ban(messageData: any) {
        const member = messageData.mentions.members.first();
        if (member.bannable) {
            const banned = await member.ban();

            if (banned) {
                if (config.admin.kickMessage) {
                    const message = config.admin.kickMessage.replace("{USERNAME}", member.displayName);
                    messageData.channel.send(message);
                }
            } else {
                this.logger.error(`Could not ban member: ${member.id}`);
                // TODO: message author privately to log error
            }
        } else {
            this.logger.error(`Could not ban non-bannable member: ${member.id}`);
        }
    }

    private silence(messageData: any) {

    }
}