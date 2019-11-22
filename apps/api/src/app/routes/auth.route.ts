import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import { APP_SECRET } from '../modules/auth';
import { Log } from '../modules/logger';

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  try {
    const user = await User.getOne({
      email: req.body.email
    });
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.json({
          id: user._id,
          email: user.email,
          token: jwt.sign({id: user._id, email: user.email}, 
            APP_SECRET, {
            expiresIn: '365 days'
          })
        });
        return;
      } else {
        res.json({message: 'PASSWORD INCORRECT'});
      }
    } else {
      res.json({message: 'USER NOT FOUND'});
    }
  } catch {
    res.json({message: 'MONGO ERROR'});
  }
});

authRouter.post('/signup', async (req, res) => {
  try {
    const exuser = await User.getOne({
      email: req.body.email
    });
    if (exuser) {
      Log.main.info(' NEW USER');
      res.json({message: 'user already exists'});
      return;
    } else {
      Log.main.info('ADDING NEW USER');
      const user = await User.add({
        email: req.body.email,
        password: req.body.password
      });
      res.json({
        id: user._id,
        email: user.email,
        token: jwt.sign({id: user._id, email: user.email}, 
          APP_SECRET, {
          expiresIn: '365 days'
        })
      });
    }
  } catch {
    res.json({message: 'MONGO ERROR'});
  }
});