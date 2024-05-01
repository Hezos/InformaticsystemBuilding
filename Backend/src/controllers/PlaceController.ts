import { Controller } from "./base.controller";
import { Place } from "../entity/Place";
import { AppDataSource } from "../data-source";

export class PlaceController extends Controller
{
    static repository = AppDataSource.getRepository(Place);    
    isValid = async (place:Place) =>{
        //TODO: validation progress goes here!
       if(!place.address || !place.name){
        return false;
       }
        return true;
    };

    //Call an update when changing for active and inactive!!!

    static isActive = async (Address:string):Promise<boolean> =>{
        var result:Place = await this.repository.findOneBy({address:Address});
        return result.active;
    };

    GetActives = async (req, res)=>{
        try {
            var result = this.repository.findBy({active:true});
            res.json(result);   
        } catch (error) {
            this.handleError(res, error);
        }
    }

    //Seems to override at the getgo if the name of the method is matched
    CreatePlace = (req, res) =>{
        if(this.isValid(req)){
            this.create(req, res);
        }
    }

}