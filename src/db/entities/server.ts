import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { User } from "./user";
import { AllowedChannel } from "./allowedChannel";

@Entity({ name: "servers"})
export class Server {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serverId: string;

    @Column()
    adminId: string;

    @Column()
    prefix: string;

    @OneToMany(type => User, user => user.server)
    users: User[];

    @OneToMany(type => AllowedChannel, channel => channel.server)
    channels: AllowedChannel[];
}