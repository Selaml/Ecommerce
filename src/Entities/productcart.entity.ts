
import { BaseEntity, Column, CreateDateColumn, Timestamp, Entity, PrimaryColumn, BeforeInsert, OneToMany, ManyToOne, OneToOne, ManyToMany, JoinTable, Double } from "typeorm";
import * as uuid from "uuid"
import { baseEntity } from "./BaseEntity";
import { usersEntity } from "./users.entity";
import { permissionsEntity } from "./permission.entity";
import { productEntity } from "./product.entity";
import { cartEntity } from "./cart.entity";


@Entity('cartProducts')
export class productCartEntity {


    @PrimaryColumn({ primary: false })
    productId: string

    @PrimaryColumn({ primary: false })
    cartId: string

    @ManyToOne(() => productEntity)
    product: productEntity;

    @ManyToOne(() => cartEntity)
    cart: cartEntity;

    @Column()
    quantity: number


    @CreateDateColumn()
    createdAt: Date


    @CreateDateColumn()
    updatedAt: Date









}




