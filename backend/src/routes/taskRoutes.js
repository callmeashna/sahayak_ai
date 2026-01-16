import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByLocation,
  assignTask,
  completeTask
} from '../controllers/taskController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllTasks);
router.get('/location', getTasksByLocation);
router.get('/:id', getTaskById);

// Protected routes (require authentication)
router.post('/', authenticate, createTask);
router.put('/:id', authenticate, updateTask);
router.delete('/:id', authenticate, deleteTask);
router.post('/:id/assign', authenticate, assignTask);
router.post('/:id/complete', authenticate, completeTask);

export default router;
