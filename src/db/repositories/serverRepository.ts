import {EntityRepository, Repository} from "typeorm";
import { Server } from "../entities/server";
import { injectable } from "inversify";

@injectable()
@EntityRepository(Server)
export class ServerRepository extends Repository<Server> {

    public test(): string {
        return "Hello!";
    }
}