import { decorate, injectable, inject } from "inversify";
import { Connection, Repository, createConnection } from "typeorm";
import { Server } from "./entities/server";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { User } from "./entities/user";
import { AllowedChannel } from "./entities/allowedChannel";

decorate(injectable(), Repository);

@injectable()
export class ORM {
    private connection: Connection;

    constructor(
        @inject("Settings.DB_URL") private dbUrl: string,
        @inject("Settings.SYNCHRONIZE_DB") private sync: boolean
    ) {
    }

    public async connect() {
        try {
            if (this.connection) {
                return;
            }

            this.connection = await createConnection({
                type: "postgres",
                url: this.dbUrl,

                entities: [
                    Server,
                    User,
                    AllowedChannel
                ],
                synchronize: this.sync,
                logging: ["query", "schema"],
                namingStrategy: new SnakeNamingStrategy(),
                cache: {
                    duration: 1000 * 60 * 30
                }
            });

            console.log(`Connected to database`);

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public getConnection() {
        return this.connection;
    }
}