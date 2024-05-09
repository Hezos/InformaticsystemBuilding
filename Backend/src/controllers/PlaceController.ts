import { Controller } from "./base.controller";
import { Place } from "../entity/Place";
import { AppDataSource } from "../data-source";

export class PlaceController extends Controller
{
    repository = AppDataSource.getRepository(Place);    
    isValid = async (place:Place) =>{
       if(!place.address || !place.name){
        return false;
       }
        return true;
    };

    //Call an update when changing for active and inactive!!!

     isActive = async (pAddress:string):Promise<boolean> =>{
        var resultPlaces:Array<Place> = await this.repository.find();
        var result:Place = null;
        resultPlaces.map(
            (item) =>{
                if(item.address == pAddress){
                    return item.active;
                }
            }
        );
        return false;
    };
    //Seems to override at the getgo if the name of the method is matched
    CreatePlace = (req, res) =>{
        if(this.isValid(req)){
            this.create(req, res);
        }
    }

    GetAddresses = async () =>{
        var result:Array<string> = [];
        var resultPlaces = await this.repository.find();
        resultPlaces.map((element) =>{
            result.push(element.address);
        });
        return result;
    }

}