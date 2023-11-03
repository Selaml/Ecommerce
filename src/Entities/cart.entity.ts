import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { baseEntity } from "./BaseEntity";
import { usersEntity } from "./users.entity";
import { productEntity } from "./product.entity";

@Entity("carts")
export class cartEntity extends baseEntity {
    @Column()
    userId: string

    @OneToOne(() => usersEntity)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: usersEntity


    @ManyToMany(() => productEntity)
    @JoinTable({
        name: 'cartProducts', // Use a unique name for this pivot table
        joinColumn: {
            name: 'cartId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'productId',
            referencedColumnName: 'id',
        },
    })
    products: productEntity[];
}