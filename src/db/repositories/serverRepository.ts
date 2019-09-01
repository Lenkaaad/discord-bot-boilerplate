import {EntityRepository, Repository} from "typeorm";
import { Server } from "../entities/server";
import { injectable } from "inversify";

interface Existence {
    exists: boolean;
    id?: number;
}

@injectable()
@EntityRepository(Server)
export class ServerRepository extends Repository<Server> {

    public async exists(serverId: string): Promise<Existence> {
        const server = await this.findOne({ where: { serverId }});
        return server ? { exists: true, id: server.id } : { exists: false }
    }
}