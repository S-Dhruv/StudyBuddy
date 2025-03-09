import express from 'express';
import {createAiTask,createUserTask} from '../controllers/task.controller.js';
const router = express.Router();

router.post("/createAiTask",createAiTask);
router.post("/createUserTask",createUserTask);
export default router