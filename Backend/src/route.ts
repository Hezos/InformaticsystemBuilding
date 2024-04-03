import express, { Router } from 'express';
import { UserController } from './controllers/UserController';
import { DonorController } from './controllers/DonorController';
import { PlaceController } from './controllers/PlaceController';

export function getRouter():Router{
    const router:Router = express.Router();
    const userController:UserController = new UserController();
    const donorController:DonorController = new DonorController();
    const placeController:PlaceController = new PlaceController();
    router.get('/user', userController.getAll);
    router.get('/donor', donorController.getAll);
    router.get('/place', placeController.getAll);

    return router;
}