import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import {UserGroup} from './userGroupModal'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
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

    @ManyToOne(()=> UserGroup)
    @JoinColumn({name:"group_id"})
    group: UserGroup

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    update_at: Date;

}