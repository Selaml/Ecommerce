
import { BaseEntity, Column, CreateDateColumn, Timestamp, Entity, PrimaryColumn, BeforeInsert, OneToMany, ManyToOne, OneToOne, ManyToMany, JoinTable, Double, JoinColumn } from "typeorm";
import * as uuid from "uuid"
import { baseEntity } from "./BaseEntity";
import { usersEntity } from "./users.entity";
import { permissionsEntity } from "./permission.entity";
import { categoryEntity } from "./category.entity";
import { cartEntity } from "./cart.entity";
import { OrderEntity } from "./order.entity";


@Entity('products')
export class productEntity extends baseEntity {


    @Column({ length: 500, type: "varchar" })
    productName: string;

    @Column()
    description: string;


    @Column('decimal', { precision: 10, scale: 3 })
    price: Double;

    @Column({ nullable: true })
    categoryId: string;

    @Column()
    image: string;
    @Column({ nullable: true })
    ratting: number;

    @Column({ nullable: true })
    userId: string;
    @Column({ nullable: true })
    updatedBy: string;





    @ManyToOne(() => categoryEntity, (cat) => cat.products)
    @JoinColumn({
        name: 'categoryId',
        referencedColumnName: 'id',
    },
    )
    catagories: categoryEntity


    @ManyToMany(() => cartEntity)
    @JoinTable({
        name: 'cartProducts', // Use a unique name for this pivot table
        joinColumn: {
            name: 'productId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'cartId',
            referencedColumnName: 'id',
        },
    })
    carts: cartEntity[];

    @ManyToOne(() => usersEntity, (user) => user.products)
    user: usersEntity




    @ManyToMany(() => OrderEntity)
    @JoinTable({
        name: 'productorders', // Use a unique name for this pivot table
        joinColumn: {
            name: 'productId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'orderId',
            referencedColumnName: 'id',
        },
    })
    orders: OrderEntity[];





}




