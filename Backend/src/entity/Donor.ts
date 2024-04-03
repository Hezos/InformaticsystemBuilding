import { Entity, ObjectIdColumn, ObjectId, Column } from "../Backend/node_modules/typeorm"
import {Guid} from 'guid-typescript';

@Entity()
export class Donor
{
    @ObjectIdColumn()
    id:Guid;
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
}
