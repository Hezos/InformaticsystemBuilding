import {Guid} from '../FrontendUI/FrontEndUI/node_modules/guid-typescript'
export interface UserDTO{
    id:number;
    name:string;
    address:string;
    
};

export interface Donor
{
    id:string;
    name:string;
    nation:string;
    birthplace:string;
    birthtime:Date;
    adddress:string;
    SSN:string;
    canApply:boolean;

}


export interface Place
{
    _id?:string;
    name?:string;
    address?:string;
    active?:boolean;
}

export interface Donation
{
    _id:string;
    address:string;
    date:Date;
    isAble:boolean;
    reason?:string;
    doctor:string;
    isControlled:boolean;
    patient?:string;
    SSN?:string;
    endDate:Date;
}
