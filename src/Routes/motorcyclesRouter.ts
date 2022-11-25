import { Router } from 'express';
import MotorcycleController from '../Controllers/MotocycleController';
import MotorcycleService from '../Services/MotorcycleService';

const router = Router();

const motorcycleService = new MotorcycleService();
const motorcycleController = new MotorcycleController(motorcycleService);

router.put('/:id', motorcycleController.updateMotorcycle);
router.post('/', motorcycleController.createMotorcycle);
router.get('/', motorcycleController.findAllMotorcycle);
router.get('/:id', motorcycleController.findMotorcycleById);
router.delete('/:id', motorcycleController.deleteMotorcycleById);

export default router;