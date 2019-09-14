import {EntityRepository, Repository} from "typeorm";
import { injectable } from "inversify";
import { AllowedChannel } from "../entities/allowedChannel";

interface Existence {
    exists: boolean;
    id?: number;
}

@injectable()
@EntityRepository(AllowedChannel)
export class ChannelRepository extends Repository<AllowedChannel> {
    
    public async exists(channelId: string): Promise<Existence> {
        const channel = await this.findOne({ where: { channelId }, cache: { id: "channels", milliseconds: 1000 * 60 }});
        return channel ? { exists: true, id: channel.id } : { exists: false };
    }
}