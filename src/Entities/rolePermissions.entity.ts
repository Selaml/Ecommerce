
import { BaseEntity, Column, CreateDateColumn, Timestamp, Entity, PrimaryColumn, BeforeInsert, OneToMany, ManyToOne, OneToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import * as uuid from "uuid"
import { baseEntity } from "./BaseEntity";
import { usersEntity } from "./users.entity";
import { permissionsEntity } from "./permission.entity";
import { rolesEntity } from "./role.entity";


@Entity('rolePermissions')

export class rolePermissionEntity {

    // @PrimaryColumn("uuid")
    // id: string;

    @PrimaryColumn({ primary: false })
    roleId: string

    @PrimaryColumn({ primary: false })
    permissionId: string





    @ManyToOne(() => rolesEntity)

    role: rolesEntity;

    @ManyToOne(() => permissionsEntity,)
    permission: permissionsEntity;



    // @BeforeInsert()
    // async generateUuid(): Promise<any> {
    //     this.id = uuid.v4();

    // }




}