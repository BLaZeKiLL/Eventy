import { Schema } from '../modules/mongo';

export interface IUser {
  _id?: Schema.Types.ObjectId,
  email: string,
  password: string,
  events?: IEvent[]
}

export interface IUserFilter {
  _id?: Schema.Types.ObjectId,
  email?: string,
  password?: string,
  events?: IEvent[]
}

export interface IUserInput {
  email: string,
  password: string
}

export interface IEvent {
  _id?: Schema.Types.ObjectId,
  name: string,
  description: string,
  venue: string,
  date: Date,
  imgURL: string,
  user?: IUser
}

export interface IEventFilter {
  _id?: Schema.Types.ObjectId,
  name?: string,
  venue?: string,
  date?: Date,
  description?: string,
  imgURL?: string,
  user?: IUser
}

export interface IEventInput {
  name: string,
  description: string,
  venue: string,
  date: Date,
  imgUrl: string,
  user: string
}