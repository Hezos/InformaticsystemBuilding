import { Any, Repository } from "typeorm";
import { Place } from "../entity/Place";
import { AppDataSource } from "../data-source";

export class PlaceController
{
    repository:Repository<Place> = AppDataSource.getRepository(Place);
    getAll = async (req, res) =>
    {
        try {
            const entities:Place[] = await this.repository.find();
            res.json(entities);
        } catch (error) {
            this.handleError(res,error);
        }
    }

    AddPlace = async (req, res) =>
    {
        try {
            console.log(req.body.name);
            var result:Place = new Place(req.body.name,req.body.address,req.body.active);
            res.json(this.repository.save(result));
        } catch (error) {
            this.handleError(res,error);
        }        
    }

    handleError = async (res, err, status=500, message = 'Internal server error') =>{
        if(err){
            console.error(err);
        }
        res.status(status).json({error:message});
    }
}