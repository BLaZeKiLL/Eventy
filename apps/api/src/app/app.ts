import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import { Mongo } from './modules/mongo';
import { environment } from '../environments/environment';
import { Log } from './modules/logger';
import { User } from './models/user.model';

import { authRouter } from './routes/auth.route';
import { eventRouter } from './routes/event.route';

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.connectDB();
    this.bodyParser();
    this.logger();
    this.router();
  }

  private connectDB(): void {
    Mongo.connectDB(environment.dburl);
  }

  private logger(): void {
    Log.initialize();
  }

  private bodyParser(): void {
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.text());
    this.app.use(bodyParser.json({ type: 'application/json'}));
  }

  private router(): void {
    this.app.use('/auth', authRouter);
    this.app.use('/event', eventRouter);
  }

  public serve(): App {
    const port = process.env.port || 3333;
    const server = this.app.listen(port, () => {
      Log.main.info(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);
    return this;
  }

  public async dummyLoad() {
    await User.add({
      email: 'admin@gmail.com',
      password: 'admin'
    });
    Log.main.info('DUMMY DATA ADDED');
  }

}