import { Repository } from "typeorm";
import { Controller } from "./base.controller";
import { Donation } from "../entity/Donation";
import { AppDataSource } from "../data-source";
import { PlaceController } from "./PlaceController";
import { DonorController } from "./DonorController";

export class DonationController extends Controller
{
    repository: Repository<Donation> = AppDataSource.getRepository(Donation);
    override create = async (req, res) => {
        try {
            if(!PlaceController.isActive(req.address)){                 
                this.handleError(res, 'The place is not active!');
            }else{
                const entity = this.repository.create(req.body as object);
                delete entity.id;
                const entityInserted = await this.repository.save(entity);
                res.json(entityInserted);
            }                
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getSuccessfull = async (req, res) =>{
        try {
            //Get with multiple get oportunities
            var donations:Array<Donation> = await this.repository.findBy({isAble:true});
            res.json(donations);
        } catch (error) {
            this.handleError(req,error);
        }
    };

    getByAddress = async(req, res) =>{
        try {
            var donations:Array<Donation> = await this.repository.findBy({ isAble:true, address:req.address});
            res.json(donations);
        } catch (error) {
            this.handleError(req, error);
        }
    };

    getByDonor = async(req, res) =>{
        try {
            var donations:Array<Donation> = await this.repository.findBy({ isAble:true, patient:req.name});
            res.json(donations);
        } catch (error) {
            this.handleError(req, error);
        }
    };
    
    getByTimeInterval = async(req, res) =>{
        try {
            var donations:Array<Donation> = await this.repository.findBy({ isAble:true});
            var selected:Donation;
            for (let i = 0; i < donations.length; i++) {
                if(donations.at(i).endDate == req.endDate && donations.at(i).date == req.start ){
                    selected = donations.at(i);
                }
            }
            res.json(selected);
        } catch (error) {
            this.handleError(req, error);
        }
    };
}