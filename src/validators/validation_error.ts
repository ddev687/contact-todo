import { validationResult } from 'express-validator'
import express from 'express';

export function validationError(req: express.Request, res: express.Response, next: express.NextFunction) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const response = {
      message: errors.array().map(err => err.msg).join(', ')
    }
    return res.status(422).json(response)
  }
  next()
}
