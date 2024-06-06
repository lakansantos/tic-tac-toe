import express from 'express';
import saveGameController from '../../controllers/gameController/saveGameController.js';

const saveGameRouter = express.Router();
saveGameRouter.post('/save-game', saveGameController);
export default saveGameRouter;
