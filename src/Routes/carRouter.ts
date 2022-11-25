import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarService from '../Services/CarService';

const router = Router();

const carService = new CarService();
const carController = new CarController(carService);

router.put('/:id', carController.updateCar);
router.post('/', carController.createCar);
router.get('/', carController.findAllCars);
router.get('/:id', carController.findCarById);
router.delete('/:id', carController.deleteCarById);

export default router;