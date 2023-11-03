
import { BaseEntity, Column, CreateDateColumn, Timestamp, Entity, PrimaryColumn, BeforeInsert, OneToMany, ManyToOne, OneToOne } from "typeorm";
import * as uuid from "uuid"
import { baseEntity } from "./BaseEntity";
import { rolesEntity } from "./role.entity";
import { paymentEntity } from "./payment.entity";
import { productEntity } from "./product.entity";

@Entity('users')
export class usersEntity extends baseEntity {

    @Column({ length: 500, type: "varchar" })
    name: string;

    @Column({ length: 50 })
    email: string;


    @Column()
    password: string;

    @Column({ nullable: true })
    roleId: string;

    @Column({ nullable: true })
    proPic: string;

    @OneToMany(() => paymentEntity, (pay) => pay.user)
    payments: paymentEntity[]

    @OneToMany(() => productEntity, (pro) => pro.user)
    products: productEntity[]


    @ManyToOne(() => rolesEntity, (role) => role.users)
    role: rolesEntity








}