import { BotConfig, BotType } from "./src/types/botConfig";

export const config: BotConfig = {
    type: BotType.Admin,
    admin: {
        kickMessage: "Bye, bitch, {USERNAME}!"
    }
}