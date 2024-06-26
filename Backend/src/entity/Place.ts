import {Guid} from 'guid-typescript';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

//Connections can be marked like: ManyToOne, OneToMany

@Entity()
export class Place
{
    constructor(Name:string, Address:string, Active:boolean){
        this._id = Guid.create().toString();
        this.name = Name;
        this.address = Address;
        this.active = Active;
    }


    @ObjectIdColumn()
    public _id:string;
    @Column()
    public name:string;
    @Column()
    public address:string;
    @Column()
    public active:boolean;
}
