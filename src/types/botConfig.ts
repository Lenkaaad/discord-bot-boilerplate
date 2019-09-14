export interface BotConfig {
    type: BotType,
    admin?: AdminBot
}

export enum BotType {
    Music,
    Admin,
    Fun
}

export interface AdminBot {
    kickMessage?: string | false;
    banMessage?: string | false;
    silenceMessage?: string | false;
}