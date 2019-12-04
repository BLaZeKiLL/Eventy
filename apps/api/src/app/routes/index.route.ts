import * as express from 'express';
import * as path from 'path';

export const indexRouter = express.Router();

indexRouter.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname));
});