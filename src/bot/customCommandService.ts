import { injectable } from "inversify";
import { Logger } from "../utils/logger";

@injectable()
export class CustomCommandService {
    constructor(
        private logger: Logger
    ) {
        this.logger.init("Custom:CommandService");
    }

    public executeCommand(messageData: any, command: string, args: [string]) {
        switch (command) {
            case "test":
                this.logger.warning("Custom test command.");
                break;
            default:
                break;
        }
    }
}