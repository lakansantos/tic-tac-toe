import dotenv from 'dotenv';
import express from 'express';

import db from './src/config/db.js';

import { API_VERSION_URL } from './src/config/environment.js';
import cors from 'cors';
import saveGameRouter from './src/routes/gameRoutes/saveGameRoutes.js';
import getGameRouter from './src/routes/gameRoutes/getGameRoutes.js';
async function server() {
  dotenv.config();

  db();
  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: '*',
    }),
  );
  app.use(API_VERSION_URL, saveGameRouter);
  app.use(API_VERSION_URL, getGameRouter);

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Listening to Port: ${port}`);
  });
}

server();
