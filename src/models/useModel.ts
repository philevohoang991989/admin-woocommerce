import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string ;

    @Column()
    password: string ;

    @Column()
    avatar: string;

    @Column()
    full_name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({unique: true})
    phone: string;

    @Column()
    status: string ;

    @Column()
    created_at: Date;

    @Column()
    update_at: Date;

}