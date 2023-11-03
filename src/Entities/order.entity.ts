import { Column, Double, Entity, JoinTable, ManyToMany } from "typeorm";
import { baseEntity } from "./BaseEntity";
import { productEntity } from "./product.entity";



@Entity('orders')
export class OrderEntity extends baseEntity {
    @Column('decimal')
    totalAmount: Double

    @Column({ default: false })
    IsPaid: boolean




    @ManyToMany(() => productEntity)
    @JoinTable({
        name: 'productorders', // Use a unique name for this pivot table
        joinColumn: {
            name: 'orderId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'productId',
            referencedColumnName: 'id',
        },
    })
    products: productEntity[];

}

