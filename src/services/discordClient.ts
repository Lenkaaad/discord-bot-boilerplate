import { injectable } from "inversify";
import { Logger } from "../utils/logger";

const Discord = require(`discord.js`);

@injectable()
export class D {
    public _client; 

    constructor(
        private logger: Logger
    ) {
        this._client = new Discord.Client();
        this._client.login(process.env.BOT_DEV_TOKEN);

        this.logger.init("DiscordClient");
    }

    public get client() {
        return this._client;
    }
}