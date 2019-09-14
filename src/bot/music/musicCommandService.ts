import { injectable } from "inversify";
import { Logger } from "../../utils/logger";

@injectable()
export class MusicCommandService {
    constructor(
        private logger: Logger
    ){
        this.logger.init("MuiscCommandService");
    }

    public executeCommand(messageData: any, command: string, args: [string]) {
        switch (command) {
            case "play":
                // integrate admin-only music commands here
            default:
                break;
        }
    }

}