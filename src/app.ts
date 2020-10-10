import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import classesRoutes from './routes/classesRoutes';
import connectionsRoutes from './routes/connectionsRoutes';

dotenv.config();

class App {
  public app = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  routes(): void {
    this.app.use('/classes', classesRoutes);
    this.app.use('/connections', connectionsRoutes);
  }
}

export default new App().app;