import { Entity, ObjectIdColumn, ObjectId, Column } from "../Backend/node_modules/typeorm"
import {Guid} from 'guid-typescript';

@Entity()
export class Donation
{
    @ObjectIdColumn()
    id:Guid;
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
