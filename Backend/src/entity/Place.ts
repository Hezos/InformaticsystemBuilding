import {Guid} from 'guid-typescript';
import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

//Connections can be marked like: ManyToOne, OneToMany

@Entity()
export class Place
{
    constructor(Name:string, Address:string, Active:boolean){
        this.id = Guid.create();
        this.name = Name;
        this.address = Address;
        this.active = Active;
    }


    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    id:Guid;
    @Column()
    public name:string;
    @Column()
    public address:string;
    @Column()
    public active:boolean;
}
