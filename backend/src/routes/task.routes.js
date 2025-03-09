import express from 'express';
import {createAiTask,createUserTask} from '../controllers/task.controller.js';
const router = express.Router();

router.post('/createAiTask', async (req, res) => {
    const { _id, aiTask } = req.body;
    if (!_id || !aiTask) {
        return res.status(400).json({ msg: "Missing required fields" });
    }
    await createAiTask(_id, aiTask, res);
  });
router.post('/createUserTask', async (req, res) => {
    const { _id, aiTask } = req.body;
    if (!_id || !aiTask) {
        return res.status(400).json({ msg: "Missing required fields" });
    }
    await createUserTask(_id, aiTask, res);
  });
// router.post("/createUserTask",createUserTask); 
// router.post("/createAiTask",createAiTask);
export default router