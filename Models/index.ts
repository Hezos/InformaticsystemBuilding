export interface UserDTO{
    id:number;
    name:string;
    address:string;
};

export interface Donor
{
    _id?:string;
    name?:string;
    nation?:string;
    birthplace?:string;
    birthtime?:Date;
    //Doesn't want to handle property!
    adddress?:string;
    SSN?:string;
    canApply?:boolean;
    test?:string;
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
    _id?:string;
    address?:string;
    date?:Date;
    isAble?:boolean;
    reason?:string;
    doctor?:string;
    isControlled?:boolean;
    patient?:string;
    SSN?:string;
    endDate?:Date;
}
