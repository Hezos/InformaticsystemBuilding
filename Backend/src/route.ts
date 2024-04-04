import express, { Router } from 'express';
import { UserController } from './controllers/UserController';
import { DonorController } from './controllers/DonorController';
import { PlaceController } from './controllers/PlaceController';
export function getRouter():Router{
    const router:Router = express.Router();
    router.use(express.json());
    const userController:UserController = new UserController();
    router.get('/user', userController.getAll);
    const donorController:DonorController = new DonorController();
    router.get('/donor', donorController.getAll);
    const placeController:PlaceController = new PlaceController();
    router.get('/place', placeController.getAll);
    router.post('/place', placeController.AddPlace);

    return router;
}