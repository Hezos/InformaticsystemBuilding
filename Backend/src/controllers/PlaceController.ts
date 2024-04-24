import { Controller } from "./base.controller";
import { Place } from "../entity/Place";
import { AppDataSource } from "../data-source";

export class PlaceController extends Controller
{
    repository = AppDataSource.getRepository(Place);
    
}