import express from 'express';

import getGameController from '../../controllers/gameController/getGameController.js';

const getGameRouter = express.Router();
getGameRouter.get('/all-games', getGameController);
export default getGameRouter;
