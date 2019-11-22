import * as express from 'express';
import { auth } from '../modules/auth';
import { Event } from '../models/event.model';
import { User } from '../models/user.model';

export const eventRouter = express.Router();

eventRouter.post('/add', auth, async (req, res) => {
  try {
    req.body.event.user = req.body.userid;
    const event = await Event.add(req.body.event);
    await User.addEvent({events: event._id}, req.body.userid);
    res.json(event);
  } catch {
    res.json({message: 'failed to add event'});
  }
});

eventRouter.post('/otherevents', auth, async (req, res) => {
  try {
    const events = (await Event.get()).filter((event) => event.user._id.toString() !== req.body.userid);
    const asyncRef = events.map(async (event) => {
      let temp: any = event;
      temp.email = (await User.getOne(undefined, event.user._id)).email;
      return temp;
    });
    await Promise.all(asyncRef);
    res.json(events);
  } catch {
    res.json({message: 'event error'});
  }
});

eventRouter.post('/myevents', auth, async (req, res) => {
  try {
    const events = (await Event.get()).filter((event) => event.user._id.toString() === req.body.userid);
    res.json(events);
  } catch {
    res.json({message: 'event error'});
  }
});
