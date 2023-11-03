
import { Type } from "class-transformer";
import { timeStamp } from "console";
import { BaseEntity, Column, CreateDateColumn, Timestamp, Entity, PrimaryColumn, BeforeInsert, UpdateDateColumn } from "typeorm";
import * as uuid from "uuid"

@Entity('users')
export class baseEntity extends BaseEntity {


    @PrimaryColumn("uuid")
    id: string;


    @UpdateDateColumn()
    updatedAt: Date;


    @CreateDateColumn()
    createdAt: Date;


    @Column({ default: "false" })
    isDeleted: boolean;






    @BeforeInsert()
    async generateUuid(): Promise<any> {
        this.id = await uuid.v4();

    }


}

function TimestampColumn(): (target: baseEntity, propertyKey: "name") => void {
    throw new Error("Function not implemented.");
}
