import express, { Router } from 'express';
import { DonorController } from './controllers/DonorController';
import { PlaceController } from './controllers/PlaceController';
import { UserController } from './controllers/UserController';
import { DonationController } from './controllers/DonationController';
export function getRouter():Router{
    const router:Router = express.Router();
    router.use(express.json());
    const userController:UserController = new UserController();
    router.get('/user', userController.getOne);
    router.post('/user', userController.create);
    router.delete('/user',userController.delete);
    router.patch('/user',userController.update);
    const donorController:DonorController = new DonorController();
    router.get('/donor', donorController.getAll);
    router.delete('/donor',donorController.delete);
    router.post('/donor',donorController.create);
    router.patch('donor',donorController.update);
    const placeController:PlaceController = new PlaceController();
    router.get('/place', placeController.getAll);
    router.post('/place', placeController.create);
    router.delete('/place', placeController.delete);
    router.patch('/place',placeController.update);
    const donationController:DonationController = new DonationController();
    router.get('/donation',donationController.getAll);
    router.post('/donation',donationController.create);
    router.patch('/donation',donationController.update);
    router.delete('/donation',donationController.delete);
    

    return router;
}