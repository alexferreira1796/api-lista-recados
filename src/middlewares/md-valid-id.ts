import express, {Request, Response, NextFunction} from 'express';
import { validate } from 'uuid';

function validId(req: Request, res: Response, next: NextFunction) {
  const {id}: {id?: string} = req.params;

  if(!validate(id)) {
    return res.status(400).json({
      success: false,
      data: null,
      msg: 'ID not validate'
    })
  }
  
  next();
}

export default validId;