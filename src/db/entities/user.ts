import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Server } from "./server";

@Entity({ name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Server, server => server.users, { onDelete: 'CASCADE' })
    server: Server;

    @Column()
    serverId: number;

    @Column()
    userId: string;

    @Column()
    userName: string;

    @Column()
    tag: string;

}