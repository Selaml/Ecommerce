import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { baseEntity } from "./BaseEntity";
import { OrderEntity } from "./order.entity";
import { productEntity } from "./product.entity";



@Entity('productorders')
export class ProductOrderEntity {


    @Column({ nullable: true })
    quantity: number


    @PrimaryColumn({ primary: false })
    productId: string

    @PrimaryColumn({ primary: false })
    orderId: string



    @ManyToOne(() => OrderEntity)

    order: OrderEntity;

    @ManyToOne(() => productEntity)
    product: productEntity;





}

