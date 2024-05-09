import { Repository } from "typeorm";
import { Controller } from "./base.controller";
import { Donation } from "../entity/Donation";
import { AppDataSource } from "../data-source";
import { PlaceController } from "./PlaceController";
import { DonorController } from "./DonorController";
import { Guid } from "guid-typescript";

export class DonationController extends Controller
{

    repository: Repository<Donation> = AppDataSource.getRepository(Donation);
    override create = async (req, res) => {
        var dc:DonorController = new DonorController();
        var names:Array<string> = await dc.getNames();
        var pc:PlaceController = new PlaceController();
        var addresses:Array<string> = await pc.GetAddresses();
        try {
            var active:boolean = await pc.isActive(req.body.address);
            if(active === false){                 
                this.handleError(res, 'The place is not active!');
            }
            else if(!names.includes(req.body.patient)){
                this.handleError(res, 'Patient is not correct');
            }
            else if(!addresses.includes(req.body.address)){
                this.handleError(res, 'Place name was not correct.');
            }
            else if(!req.isAble && (req.body.reason == '' || req.body.doctor == '') ){
                this.handleError(res, 'Need medical attention');
            }else if(req.isControlled && (req.body.SSN == '' || req.body.patient == '')){
                this.handleError(res, 'Controlled needs patient and SSN');
            }
            else{
                const entity = this.repository.create(req.body as object);
                entity._id = Guid.create().toString();
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
            //var donations:Array<Donation> = await this.repository.find({select: {isAble:true} } );
            var donations:Array<Donation> = await this.repository.find();
            var result:Array<Donation> =[];
            donations.map((item) =>{
                if(item.isAble){
                    result.push(item);
                }
            });
            res.json(result);
        } catch (error) {
            this.handleError(req,error);
        }
    };

    getByAddress = async(req, res) =>{
        try {
            var donations:Array<Donation> = await this.repository.find();
            var Actives:Array<Donation> = [];
            donations.map((item) =>{
                if(item.isAble == true){
                    Actives.push(item);
                }
            });            
            var result:Array<Donation> = [];
            Actives.map((item) =>{
                if(item.address === req.body.adddress){
                    result.push(item);
                }
            });
            res.json(result);
        } catch (error) {
            this.handleError(req, error);
        }
    };

    getByDonor = async(req, res) =>{
        try {
            //Method does not supported with mongodb
            //var donations:Array<Donation> = await this.repository.findBy({ isAble:true, patient:req.body.patient});
            var donations:Array<Donation> = await this.repository.find();
            var Actives:Array<Donation> = [];
            donations.map((item) =>{
                if(item.isAble == true){
                    Actives.push(item);
                }
            });            
            var result:Array<Donation> = [];
            Actives.map((item) =>{
                if(item.patient === req.body.patient){
                    result.push(item);
                }
            });
            
            res.json(result);
        } catch (error) {
            this.handleError(req, error);
        }
    };
    
    getByStartTimeInterval = async(req, res) =>{
        try {
            var donations:Array<Donation> = await this.repository.find();
            var Actives:Array<Donation> = [];
            donations.map((item) =>{
                if(item.isAble == true){
                    Actives.push(item);
                }
            });            
            //var donations:Array<Donation> = await this.repository.findBy({ isAble:true});
            var selected:Donation;
            for (let i:number = 0; i < Actives.length; i++) {
                if(Actives.at(i).date == req.body.start){
                    selected = Actives.at(i);
                }
            }
            res.json(selected);
        } catch (error) {
            this.handleError(req, error);
        }
    };

    getByEndTimeInterval = async(req, res) =>{
        try {

            //var donations:Array<Donation> = await this.repository.findBy({ isAble:true});
            var donations:Array<Donation> = await this.repository.find();
            var Actives:Array<Donation> = [];
            donations.map((item) =>{
                if(item.isAble == true){
                    Actives.push(item);
                }
            });            
            var selected:Donation;
            for (let i:number = 0; i < Actives.length; i++) {
                if(Actives.at(i).endDate == req.body.endDate ){
                    selected = Actives.at(i);
                }
            }
            res.json(selected);
        } catch (error) {
            this.handleError(req, error);
        }
    };
}