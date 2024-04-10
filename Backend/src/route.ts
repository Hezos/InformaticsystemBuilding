import express, { Router } from 'express';
import { DonorController } from './controllers/DonorController';
import { PlaceController } from './controllers/PlaceController';
import { UserControllerChild } from './controllers/user.controller';
export function getRouter():Router{
    const router:Router = express.Router();
    router.use(express.json());
    const userController:UserControllerChild = new UserControllerChild();
    router.get('/user', userController.getAll);
    const donorController:DonorController = new DonorController();
    router.get('/donor', donorController.getAll);
    const placeController:PlaceController = new PlaceController();
    router.get('/place', placeController.getAll);
    router.post('/place', placeController.AddPlace);

    return router;
}