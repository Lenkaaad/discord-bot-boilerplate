import { injectable } from "inversify";
import { Logger } from "../utils/logger";
import { ServerRepository } from "../db/repositories/serverRepository";
import { ORM } from "../db/orm";

interface Guild {
    id: number;
    serverId: string;
    prefix: string;
    adminId: string;
}

@injectable()
export class GuildService {
    
    constructor(
        private logger: Logger,
        private serverRepository: ServerRepository,
        private orm: ORM
    ) {}

    public async getPrefix(guildId: string): Promise<string | null> {
        const guild = await this.findGuild(guildId);
        return guild.prefix;
    }

    public async getAdmin(guildId: string): Promise<string | null> {
        const guild = await this.findGuild(guildId);
        return guild.adminId;
    }

    public async setAdmin(guildId: string, adminId: string) {
        const guild = await this.findGuild(guildId);
        if (guild) {
            await this.serverRepository.update(guild.id, { adminId });
        } else {
            this.logger.error(`No guild found in database for: ${guildId}`);
        }
    
        await this.clearCache();
    }

    public async setPrefix(guildId: string, prefix: string) {
        const guild = await this.findGuild(guildId);
        if (guild) {
            await this.serverRepository.update(guild.id, { prefix });
        } else {
            this.logger.error(`No guild found in database for: ${guildId}`);
        }

        this.clearCache();
    }

    public async isUserAdmin(guildId: string, userId: string): Promise<Boolean> {
        const guild = await this.findGuild(guildId);

        if (guild) {
            return guild.adminId === userId ? true : false;
        }

        return false;
    }

    public async findGuild(guildId: string): Promise<Guild | null> {
        try {
            const guild = await this.serverRepository.findOne({ 
                where: { serverId: guildId }, 
                cache: { id: "servers", milliseconds: 1000 * 60 * 60 }});
            if (guild) {
                return guild;
            } else {
                this.logger.error(`No guild found in database for: ${guildId}`);
                return null;
            }
        } catch (err) {
            this.logger.error(`Fetching guild went wrong: ${JSON.stringify(err)}`);
        }
    }

    public async createGuild(guild) {
        try {
            this.logger.info("Adding guild to database...");
            await this.serverRepository.save({
                serverId: guild.id,
                adminId: guild.ownerID,
                prefix: "!b"
            });

            this.logger.info("Guild has been succesfully added to the database.");
        } catch (err) {
            this.logger.error("Failed to add guild to database.");
        }   
    }

    public async deleteGuild(guild) {
        try {
            this.logger.info("Removing guild from database...");
            const foundGuild = await this.serverRepository.findOne({ where: { serverId: guild.id }});

            if (foundGuild) {
                await this.serverRepository.delete(foundGuild.id);
                await this.clearCache();
                this.logger.info("Guild has been succesfully removed from the database.");
            }
        } catch (err) {
            this.logger.error("Failed to remove guild to database.");
        }
    }

    private async clearCache() {
        await this.orm.getConnection().queryResultCache.remove(["servers"]);
    }
}