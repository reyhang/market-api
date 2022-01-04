import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("admin")
export class AdminRepoEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar",unique:false,nullable:false,comment:"Adminin ismi."})
    name:string;

    @Column({type:"varchar",unique:false,nullable:false,comment:"Adminin soyismi."})
    surname:string;

    @Column({type:"varchar",unique:true,nullable:false,comment:"Adminin mail adresi."})
    email:string;

    @Column({type:"varchar",unique:false,nullable:false,comment:"Adminin şifresi."})
    password:string;
    

    
}