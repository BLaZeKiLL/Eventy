import { Schema, model, Mongo } from '../modules/mongo';
import * as bcrypt from 'bcryptjs';

import { 
  IUser, 
  IUserFilter,
  IUserInput
} from './interfaces';
import { Log } from '../modules/logger';

export class User {

  private static schema = new Schema({
    email: String,
    password: String,
    events: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }]
  });

  private static DBmodel = model('User', User.schema);

  public static async add(user: IUserInput): Promise<IUser> {
    try {
      Log.main.info(`ADDING USER ${JSON.stringify(user)}`);
      user.password = await bcrypt.hash(user.password, 12);
      return await Mongo.add(this.DBmodel, user);
    } catch (error) {
      throw error;
    }
  }

  public static async getOne(filter?: IUserFilter, id?: Schema.Types.ObjectId): Promise<IUser> {
    try {
      return await Mongo.getOne(User.DBmodel, filter, id);
    } catch (error) {
      throw error;
    }
  }

  public static async update(update: any, id: Schema.Types.ObjectId): Promise<boolean> {
    try {
      if (update.password !== undefined) update.password = await bcrypt.hash(update.password, 12);
      await Mongo.update<IUser>(User.DBmodel, update, id);
      return true;
    } catch (error) {
      throw error;
    }
  }

  public static async addEvent(update: any, id: Schema.Types.ObjectId): Promise<boolean> {
    try {
      await Mongo.addToArray<IUser>(this.DBmodel, update, id);
      return true;
    } catch (error) {
      throw error;
    }
  }

}
