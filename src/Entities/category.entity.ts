
import { BaseEntity, Column, CreateDateColumn, Timestamp, Entity, PrimaryColumn, BeforeInsert, OneToMany, ManyToOne, OneToOne, ManyToMany, JoinTable } from "typeorm";
import * as uuid from "uuid"
import { baseEntity } from "./BaseEntity";
import { usersEntity } from "./users.entity";
import { permissionsEntity } from "./permission.entity";
import { productEntity } from "./product.entity";


@Entity('categories')
export class categoryEntity extends baseEntity {


    @Column({ length: 500, type: "varchar" })
    categoryName: string;

    @Column()
    description: string;
    @Column({nullable:true})
    createdBy: string;
    @Column({nullable:true})
    updatedBy: string;

    @OneToMany(() => productEntity, (user) => user.catagories)
    products: productEntity[]





}




