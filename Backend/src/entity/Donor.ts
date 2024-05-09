import {Guid} from 'guid-typescript';
import { Collection, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Donor
{
    @ObjectIdColumn()
    _id:string;
    @Column()
    name:string;
    @Column()
    birthplace:string;
    @Column()
    birthtime:Date;
    @Column()
    adddress:string;
    @Column()
    SSN:string;
    @Column()
    canApply:boolean;
    @Column()
    nation:string;

    @Column()
    test:string;
}
