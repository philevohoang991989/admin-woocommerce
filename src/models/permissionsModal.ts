import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn} from "typeorm";

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string ;

    @Column()
    description: string ;

    @Column()
    group: string;

    @Column()
    action: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    update_at: Date;

}