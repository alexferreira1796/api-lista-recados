import express, {Request, Response, NextFunction} from 'express';
import { validate } from 'uuid';

function validId(req: Request, res: Response, next: NextFunction) {
  const {id, idMessage}: {id?: string, idMessage?:string} = req.params;

  if(id && !validate(id)) {
    return res.status(400).json({
      success: false,
      data: null,
      msg: 'ID not validate'
    })
  }

  if(idMessage && !validate(idMessage)) {
    return res.status(400).json({
      success: false,
      data: null,
      msg: 'ID not validate'
    })
  }
  
  next();
}

export default validId;