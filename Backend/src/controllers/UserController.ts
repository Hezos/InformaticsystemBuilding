import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Repository } from "typeorm";

//Make it abstract later!
export abstract class UserController
{
    repository:Repository<User> = AppDataSource.getRepository(User);
    getAll = async (req, res) =>{
        try{
            const entities:User[] = await this.repository.find();
            res.json(entities);
        }catch(error){
            this.handleError(res, error);
        }
    };

    delete = async (req, res) =>{
        try {
            const id = req.params.id;
            const entity = await this.repository.findOneBy({id:id});
            if(!entity){
                this.handleError(res, null, 404, 'Entity is not found.');
            }
            await this.repository.remove(entity);
            res.send();
        } catch (error) {
            this.handleError(res, error);
        }
    };

    getOne = async (req, res) =>{
        try {
            const id = req.params.id;
            const entity = await this.repository.findOneBy({id:id});
            if(!entity){
                return this.handleError(res, null, 404, 'Entity is not found.');
            }

            res.json(entity);

        } catch (err) {
            this.handleError(res,err);
        }
    };

    update = async (req, res) =>{
        try {
            const entity = this.repository.create(req.body as Object);
            const currentEntity = await this.repository.findOneBy({id:entity.id});
            
            if(!currentEntity){
                return this.handleError(res, null, 404, 'Entity is not found.');
            }

            await this.repository.save(entity);
            res.json(entity);
        } catch (error) {
            this.handleError(res, error);
        }
    };

    create = async (req, res) =>{
        try {
            const entity:User = this.repository.create(req.body as Object);
            delete entity.id;

            const entityInserted = await this.repository.save(entity);
            res.json(entityInserted);
        } catch (error) {
            this.handleError(res, error);
        }
    };

    handleError = async (res, err, status=500, message = 'Internal server error') =>{
        if(err){
            console.error(err);
        }
        res.status(status).json({error:message});
    };
}