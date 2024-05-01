import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Donor } from "../entity/Donor";
import { Controller } from "./base.controller";

export class DonorController extends Controller {
     repository:Repository<Donor> = AppDataSource.getRepository(Donor);
    isValid = async (SSN:String):Promise<boolean> => {
        var result:boolean;
        var SSNtest:Array<number> = [];
        var ssnString:string = "";
        var index:number = 0;
        while(index < SSN.length){
            SSNtest.push(Number(SSN.at(index)));
            index++;
        }
        var donors:Array<Donor> = await this.repository.find();
        index = donors.length;        
        ssnString.concat(donors.length.toString());
        while(index < 8){
            ssnString.concat('0');
            index++;
        }
        var last:number = 0;
        index = 0;
        var sum:number = 0;
        while(index < 8){
            if(index % 2 == 0){
                sum += Number(ssnString.at(index)) * 7;
            }else{
                sum += Number(ssnString.at(index)) * 3;
            }
            index++;
        }
        var divided:number = sum % 10;
        ssnString.concat(divided.toString());

        if(SSN != ssnString){
            result = false;
        }else{
            result = true;
        }

        return result;
    }

    override create = async (req, res) =>{
        if(this.isValid(req.SSN)){
            try {
                const entity = this.repository.create(req.body as object);
                delete entity.id;
    
                const entityInserted = await this.repository.save(entity);
                res.json(entityInserted);
            } catch (err) {
                this.handleError(res, err);
            }
        }else{
            this.handleError(res, 'The SSN number was incorrect.');
        }
    };
}