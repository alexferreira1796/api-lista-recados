import express, {Request, Response, NextFunction} from 'express';

import { users } from '../data';

function validUser(req: Request, res: Response, next: NextFunction) {
  const {id}: {id?: string} = req.params;

  const hasUser = users.find((item) => item.getId() === id);
  if(!hasUser) {
    return res.status(400).json({
      success: false,
      data: null,
      msg: 'User not found'
    })
  }

  req.body.data = hasUser;

  next();
}

export default validUser;