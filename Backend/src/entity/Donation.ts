import { Entity, ObjectIdColumn, Column } from "typeorm"
import {Guid} from 'guid-typescript';

@Entity()
export class Donation
{
    @ObjectIdColumn()
    _id:string;
    @Column()
    address:string;
    @Column()
    date:Date;
    @Column()
    isAble:boolean;
    @Column()
    reason?:string;
    @Column()
    doctor:string;
    @Column()
    isControlled:boolean;
    @Column()
    patient?:string;
    @Column()
    SSN?:string;
    @Column()
    endDate:Date;
}
