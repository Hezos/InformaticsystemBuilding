import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Donor } from "../entity/Donor";
import { Controller } from "./base.controller";
import { Guid } from "guid-typescript";

export class DonorController extends Controller {
    repository:Repository<Donor> = AppDataSource.getRepository(Donor);
    isValid = async (SSN:String):Promise<boolean> => {
        var result:boolean = true;
        var SSNtest:Array<number> = [];
        var ssnString:string = "";
        var index:number = 0;
        while(index < SSN.length){
            SSNtest.push(Number(SSN.at(index)));
            index++;
        }
        var donors:Array<Donor> = await this.repository.find();
        var x:number = 0;
        donors.map(() =>{
            x++;
        });
        index = x;

        ssnString = ssnString + index;
        index = ssnString.length;
        while(index < 8){
            ssnString = ssnString + '0';
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
        ssnString = ssnString + divided;
        console.log(ssnString);
        for(var k:number; k < ssnString.length; k++)
        {
            if(ssnString.charAt(k) != SSN.charAt(k)){
                result = false;
            }
        }
        
        return result;
    }

    override create = async (req, res) =>{
        if(this.isValid(req.body.SSN)){
            try {
                const entity = this.repository.create(req.body as Object);
                entity._id = Guid.create().toString();
                const entityInserted = await this.repository.save(entity);
                res.json(entityInserted);
            } catch (err) {
                this.handleError(res, err);
            }
        }else{
            this.handleError(res, 'The SSN number was incorrect.');
        }
    };

    getNames = async () =>{
        try {
            const resultDonors = await this.repository.find();
            var result:Array<string> = [];
            resultDonors.map(
                (element) =>{
                    result.push(element.name);
                }
            );          
            return result;
        } catch (error) {
            console.log('Did not find elements');
        }
    }
}