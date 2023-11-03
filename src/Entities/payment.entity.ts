import { Column, Double, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { baseEntity } from "./BaseEntity";
import { OrderEntity } from "./order.entity";
import { usersEntity } from "./users.entity";

@Entity('payments')
export class paymentEntity extends baseEntity {


    @Column('decimal', { precision: 10, scale: 2 })
    totalamount: number;

    @Column()
    address: string;



    @Column()
    orderId: string;
    @Column({ nullable: true })
    userId: string;
    @Column()
    tx_ref: string;



    @ManyToOne(() => usersEntity, (user) => user.payments)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: usersEntity





    @OneToOne(() => OrderEntity)
    @JoinColumn({ name: "orderId", referencedColumnName: "id" })
    order: OrderEntity




}