import express, { Router } from 'express';
import { UserController } from './controllers/UserController';

export function getRouter():Router{
    const router:Router = express.Router();
    const userController:UserController = new UserController();

    router.get('/user', userController.getAll);

    return router;
}