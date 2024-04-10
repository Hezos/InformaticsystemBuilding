import { Repository } from "typeorm";
import { User } from "../entity/User";
import { UserController } from "./UserController";
import { AppDataSource } from "../data-source";

export class UserControllerChild extends UserController{
    repository: Repository<User> = AppDataSource.getRepository(User);
    
}