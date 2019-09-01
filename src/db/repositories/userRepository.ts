import {EntityRepository, Repository} from "typeorm";
import { injectable } from "inversify";
import { User } from "../entities/user";

interface Existence {
    exists: boolean;
    id?: number;
}

@injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    public async exists(userId: string): Promise<Existence> {
        const user = await this.findOne({ where: { userId }});
        return user ? { exists: true, id: user.id } : { exists: false };
    }
}