
import { BaseEntity, Column, CreateDateColumn, Timestamp, Entity, PrimaryColumn, BeforeInsert, OneToMany, ManyToOne, OneToOne, ManyToMany, JoinTable } from "typeorm";
import * as uuid from "uuid"
import { baseEntity } from "./BaseEntity";
import { usersEntity } from "./users.entity";
import { permissionsEntity } from "./permission.entity";


@Entity('roles')
export class rolesEntity extends baseEntity {

    @Column({ length: 500, type: "varchar" })
    roleName: string;


    @OneToMany(() => usersEntity, (user) => user.role)
    users: usersEntity[]

    @ManyToMany(() => permissionsEntity, { onDelete: 'CASCADE' })
    @JoinTable({
        name: 'rolePermissions', // Use the same name
        joinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permissionId',
            referencedColumnName: 'id',
        },
    })
    permissions: permissionsEntity[];
}




