import { Schema, model, Mongo } from '../modules/mongo';
import { IEventInput, IEvent, IEventFilter } from './interfaces';
import { Log } from '../modules/logger';

export class Event {
  private static schema = new Schema({
    name: String,
    description: String,
    imgURL: String,
    venue: String,
    date: Date,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });

  private static DBmodel = model('Event', Event.schema);

  public static async add(event: IEventInput): Promise<IEvent> {
    try {
      Log.main.info(`ADDING EVENT ${JSON.stringify(event)}`);
      return await Mongo.add(Event.DBmodel, event);
    } catch (error) {
      throw error;
    }
  }

  public static async getOne(filter?: IEventFilter, id?: Schema.Types.ObjectId): Promise<IEvent> {
    try {
      return await Mongo.getOne(Event.DBmodel, filter, id);
    } catch (error) {
      throw error;
    }
  }

  public static async get(filter?: IEventFilter): Promise<IEvent[]> {
    try {
      return await Mongo.get(Event.DBmodel, filter);
    } catch (error) {
      throw error;
    }
  }


}