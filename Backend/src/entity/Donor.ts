import {Guid} from 'guid-typescript';
import { Collection, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Donor
{
    @ObjectIdColumn()
    public _id:string;
    @Column()
    public name:string;
    @Column()
    public birthplace:string;
    @Column()
    public birthtime:Date;
    @Column()
    public adddress:string;
    @Column()
    public SSN:string;
    @Column()
    public canApply:boolean;
    @Column()
    public nation:string;

    @Column()
    public test:string;
}
