import { injectable } from "inversify";

@injectable()
export class CommandService {
    constructor() {
        console.log("CommandService initialized");
    }
}