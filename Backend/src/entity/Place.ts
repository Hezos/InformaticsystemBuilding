import {Guid} from 'guid-typescript';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Place
{
    constructor(Name:string, Address:string, Active:boolean){
        this.id = Guid.create();
        this.name = Name;
        this.address = Address;
        this.active = Active;
    }

    @ObjectIdColumn()
    id:Guid;
    @Column()
    public name:string;
    @Column()
    public address:string;
    @Column()
    public active:boolean;
}
