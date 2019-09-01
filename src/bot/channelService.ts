import { injectable } from "inversify";
import { Logger } from "../utils/logger";
import { UserRepository } from "../db/repositories/userRepository";
import { ServerRepository } from "../db/repositories/serverRepository";
import { ChannelRepository } from "../db/repositories/channelRepository";
import { ORM } from "../db/orm";

@injectable()
export class ChannelService {
    constructor(
        private logger: Logger,
        private channelRepository: ChannelRepository,
        private serverRepository: ServerRepository,
        private orm: ORM
    ){}

    public async channelExists(channelId: string): Promise<boolean> {
        const channel = await this.channelRepository.exists(channelId);
        return channel.exists;
    }

    public async createChannel(channel: any, serverId: string) {
        const dbChannel = await this.channelRepository.exists(channel.id);

        if (dbChannel.exists) {
            this.logger.alert(`${serverId}: Channel ${channel.id} already exists and will not be added again.`);
            return;
        }

        const item = await this.serverRepository.exists(serverId);

        if (item.exists && item.id) {
            try {
                await this.channelRepository.save({
                    serverId: item.id,
                    channelId: channel.id
                });
            } catch (err) {
                this.logger.error(`Could not create new channel for server: ${serverId}`);
            }
        } else {
            this.logger.error(`Server with serverId ${serverId} doesn't exist in database`);
        }
    }

    public async deleteChannel(channel: any) {
        try {
            this.logger.info("Removing channel from database...");
            const foundChannel = await this.channelRepository.findOne({ where: { channelId: channel.id }});

            if (foundChannel) {
                await this.channelRepository.delete(foundChannel.id);
                await this.clearCache();
                this.logger.info("Channel has been succesfully removed from the database.");
            }
        } catch (err) {
            this.logger.error("Failed to remove channel from database.");
        }
    }

    private async clearCache() {
        await this.orm.getConnection().queryResultCache.remove(["channels"]);
    }
}