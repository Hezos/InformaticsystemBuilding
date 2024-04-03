import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Donor } from "../entity/Donor";

export class DonorController{
    repository:Repository<Donor> = AppDataSource.getRepository(Donor);
    getAll = async (req, res) =>{
        try {
            const entities:Donor[] = await this.repository.find();
        } catch (error) {
            this.handleError(res, error);
        }
    }
    
    handleError = async (res, err, status=500, message = 'Internal server error') =>{
        if(err){
            console.error(err);
        }
        res.status(status).json({error:message});
    }
}