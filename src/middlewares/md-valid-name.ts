import express, {Request, Response, NextFunction} from 'express';

import { users } from '../data';

function validName(req: Request, res: Response, next: NextFunction) {
  const {name}: {name: string} = req.body;

  if(!name) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Please, enter the name'
    });
  }

  if(name.trim().length < 3) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Minimum characters are Three'
    });
  }

  const hasUser = users.find((item) => item.getUser() === name);
  if(hasUser) {
    return res.status(400).json({
      success: false,
      data: null,
      msg: 'User exists'
    })
  }
  
  next();
}

export default validName;