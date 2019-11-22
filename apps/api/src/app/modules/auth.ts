import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const APP_SECRET = 'iuwbviudqvtiuvtwd';

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.get('jwt');
  const response = jwt.verify(token, APP_SECRET);
  if (!response) {
    res.json({message: 'NOT AUTHENTICATED'});
    return;
  } else next();
}