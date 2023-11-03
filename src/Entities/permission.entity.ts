
import { BaseEntity, Column, CreateDateColumn, Timestamp, Entity, PrimaryColumn, BeforeInsert, OneToMany, ManyToOne, OneToOne, ManyToMany, JoinTable } from "typeorm";
import * as uuid from "uuid"
import { baseEntity } from "./BaseEntity";
import { rolesEntity } from "./role.entity";


@Entity('permissions')
export class permissionsEntity extends baseEntity {

    @Column({ length: 500, type: "varchar" })
    permissionName: string;

    @Column()
    slug: string


    @ManyToMany(() => rolesEntity, { onDelete: 'CASCADE' })
    @JoinTable({
        name: 'rolePermissions', // Use the same name
        joinColumn: {
            name: 'permissionId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
        },
    })
    roles: rolesEntity[];












}