import {Guid} from 'guid-typescript';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Donor
{
    @ObjectIdColumn()
    _id:string;
    @Column()
    name:string;
    @Column()
    nation:string;
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

}
