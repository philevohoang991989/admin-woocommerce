import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn} from "typeorm";

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

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    update_at: Date;

}