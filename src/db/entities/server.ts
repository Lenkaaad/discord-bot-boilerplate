import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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

}