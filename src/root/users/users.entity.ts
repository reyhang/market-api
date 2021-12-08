import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";



@Entity('users')
export class UsersEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar',nullable:false,comment:'Kullacının isminin tutulduğu alan'})
    name:string;

    @Column({type:'varchar',nullable:false,comment:'Kullacının isminin tutulduğu alan'})
    surname:string;

    @Column({type:"varchar",nullable:false,comment:"Kullanıcının mail adresi."})
    mail:string;

    @Column({type:"varchar",nullable:false,comment:"Kullanıcının şifresi."})
    password:string;

    @Column({type:'varchar',nullable:false,comment:'Kullanıcının telefon numarası.'})
    phone:string;

}