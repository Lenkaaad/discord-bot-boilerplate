import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Server } from "./server";

@Entity({ name: "allowedChannels"})
export class AllowedChannel {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Server, server => server.channels, { onDelete: 'CASCADE' })
    server: Server;

    @Column()
    serverId: number;

    @Column()
    channelId: string;
}