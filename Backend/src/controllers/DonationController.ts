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
        var dc:DonorController = new DonorController();
        var names:Array<string> = await dc.getNames();
        var pc:PlaceController = new PlaceController();
        var addresses:Array<string> = await pc.GetAddresses();
        try {
            const pController = new PlaceController();

            if(!pController.isActive(req.address)){                 
                this.handleError(res, 'The place is not active!');
            }
            else if(!names.includes(req.patient)){
                this.handleError(res, 'Patient is not correct');
            }else if(!addresses.includes(req.address)){
                this.handleError(res, 'Place name was not correct.');
            }
            else if((!req.isAble && req.reason == '') || req.doctor == '' ){
                this.handleError(res, 'Need medical attention');
            }else if(req.isControlled && (req.SSN == '' || req.patient == '')){
                this.handleError(res, 'Controlled needs patient and SSN');
            }
            else{
                const entity = this.repository.create(req.body as object);
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
    
    getByStartTimeInterval = async(req, res) =>{
        try {
            var donations:Array<Donation> = await this.repository.findBy({ isAble:true});
            var selected:Donation;
            for (let i:number = 0; i < donations.length; i++) {
                if(donations.at(i).date == req.start){
                    selected = donations.at(i);
                }
            }
            res.json(selected);
        } catch (error) {
            this.handleError(req, error);
        }
    };

    getByEndTimeInterval = async(req, res) =>{
        try {
            var donations:Array<Donation> = await this.repository.findBy({ isAble:true});
            var selected:Donation;
            for (let i:number = 0; i < donations.length; i++) {
                if(donations.at(i).endDate == req.endDate ){
                    selected = donations.at(i);
                }
            }
            res.json(selected);
        } catch (error) {
            this.handleError(req, error);
        }
    };
}