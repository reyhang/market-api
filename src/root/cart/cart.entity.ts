import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsersEntity } from "../users/users.entity";
import { cartStatusEnum } from "./enum/cartStatus.enum";





@Entity("cart")
export class CartEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(Type => UsersEntity, entity => entity.id, {nullable : false})
    @JoinColumn({
        name : 'memberId',
    })
    memberId: UsersEntity;

    @Column({type:"tinyint",default:cartStatusEnum.HAZIRLANIYOR,nullable:false})
    status:number

    @CreateDateColumn()
    createDate:Date

    @UpdateDateColumn()
    updateDate:Date
}