import express, {Request, Response, NextFunction} from 'express';

function validPassword(req: Request, res: Response, next: NextFunction) {
  const {password, repeatPass}: {password: string, repeatPass: string} = req.body;

  if(!password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Please, enter the password'
    });
  }

  if(password.trim().length < 8) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Minimum characters are eight'
    });
  }

  if(!repeatPass) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Please, enter the password again'
    });
  }

  if(repeatPass.trim().length < 8) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Minimum characters are eight'
    });
  }

  if(password !== repeatPass) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Passwords do not match'
    });
  }

  next();
}

export default validPassword;