import { injectable } from "inversify";
import { Logger } from "./logger";

@injectable()
export class IssueTracker {
    constructor(
        private logger: Logger
    ) {
        this.logger.init("IssueTracker");
    }

    public start(client) {
        client.on("error", (e) => {
            this.logger.error(`The following Discord error happened: ${JSON.stringify(e)}`)
        });

        client.on("warn", (e) => {
            this.logger.warning(`The following Discord warning happened: ${JSON.stringify(e)}`)
        });
    }
}