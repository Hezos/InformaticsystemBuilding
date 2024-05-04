import {Guid} from '../FrontendUI/FrontEndUI/node_modules/guid-typescript'
export interface UserDTO{
    id:number;
    name:string;
    address:string;
    
};


export interface Place
{
    id?:Guid;
    name?:string;
    address?:string;
    active?:boolean;
}
