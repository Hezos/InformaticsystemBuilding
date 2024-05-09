import { Entity, ObjectIdColumn, Column } from "typeorm"

@Entity()
export class Donation
{
    @ObjectIdColumn()
    public _id:string;
    @Column()
    public address:string;
    @Column()
    public date:Date;
    @Column()
    public isAble:boolean;
    @Column()
    public reason?:string;
    @Column()
    public doctor:string;
    @Column()
    public isControlled:boolean;
    @Column()
    public patient?:string;
    @Column()
    public SSN?:string;
    @Column()
    public endDate:Date;
}
