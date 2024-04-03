import { Repository } from "typeorm";
import { Place } from "../entity/Place";
import { AppDataSource } from "../data-source";

export class PlaceController
{
    repository:Repository<Place> = AppDataSource.getRepository(Place);
    async getAll(req, res)
    {
        try {
            const entities:Place[] = await this.repository.find();
            res.json(entities);
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