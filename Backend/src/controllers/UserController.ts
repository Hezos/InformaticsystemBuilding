import { isReadable } from "stream";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Repository } from "typeorm";
export class UserController{
    repository:Repository<User> = AppDataSource.getRepository(User);
    getAll = async (req, res) =>{
        try{
            const entities:User[] = await this.repository.find();
            res.json(entities);
        }catch(error){
            this.handleError(res, error);
        }
    };

    handleError = async (res, err, status=500, message = 'Internal server error') =>{
        if(err){
            console.error(err);
        }
        res.status(status).json({error:message});
    }
}