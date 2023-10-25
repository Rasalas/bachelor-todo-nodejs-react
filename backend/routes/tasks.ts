import { Router } from 'express';
import TaskController from '../controllers/TaskController';

const router = Router();

router.get('/', (req, res) => TaskController.index(req, res));
router.get('/:id', (req, res) => TaskController.show(req, res));
router.post('/', (req, res) => TaskController.create(req, res));
router.put('/:id', (req, res) => TaskController.update(req, res));
router.delete('/:id', (req, res) => TaskController.delete(req, res));

export default router;
