import { injectable } from "inversify";
import { Logger } from "../utils/logger";
import { UserRepository } from "../db/repositories/userRepository";
import { ServerRepository } from "../db/repositories/serverRepository";

@injectable()
export class UserService {
    constructor(
        private logger: Logger,
        private userRepository: UserRepository,
        private serverRepository: ServerRepository
    ){}

    public async createUser(member: any, serverId: string) {
        const user = await this.userRepository.exists(member.id);

        if (user.exists) {
            this.logger.alert(`${serverId}: User ${member.id} already exists and will not be added again.`);
            return;
        }

        const item = await this.serverRepository.exists(serverId);

        if (item.exists && item.id) {
            try {
                await this.userRepository.save({
                    serverId: item.id,
                    userId: member.id,
                    userName: member.displayName,
                    tag: member.user.tag
                });
            } catch (err) {
                this.logger.error(`Could not create new user for server: ${serverId}`);
            }
        } else {
            this.logger.error(`Server with serverId ${serverId} doesn't exist in database`);
        }
    }
}