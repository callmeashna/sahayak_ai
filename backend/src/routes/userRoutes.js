import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUserTasks,
  getUserReviews,
  updateTrustScore
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All user routes require authentication
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.get('/tasks', authenticate, getUserTasks);
router.get('/reviews', authenticate, getUserReviews);
router.put('/trust-score', authenticate, updateTrustScore);

export default router;
