import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';

const router = Router();

router.get('/', (req, res) => ProjectController.index(req, res));
router.get('/:id', (req, res) => ProjectController.show(req, res));
router.post('/', (req, res) => ProjectController.create(req, res));
router.put('/:id', (req, res) => ProjectController.update(req, res));
router.patch('/:id', (req, res) => ProjectController.update(req, res));
router.delete('/:id', (req, res) => ProjectController.delete(req, res));

export default router;
