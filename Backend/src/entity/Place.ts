import { Entity, ObjectIdColumn, ObjectId, Column } from "../Backend/node_modules/typeorm"
import {Guid} from 'guid-typescript';

@Entity()
export class Place
{
    @ObjectIdColumn()
    id:Guid;
    @Column()
    public name:string;
    @Column()
    public address:string;
    @Column()
    public active:boolean;
}
