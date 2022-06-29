import express from 'express';
import * as userService from "../services/user.service";
import catchAsync from '../utils/catchAsync';

const createUser = catchAsync(async (req: express.Request, res: express.Response) => {
  const user = await userService.createUser(req.body);
  return res.status(200).send(user);
});

const verifyUser = catchAsync(async (req: express.Request, res: express.Response) => {
  const data = await userService.verifyUser({ verifyToken: req.query.verifyToken });
  return res.status(200).send(data)
});

const loginUser = catchAsync(async (req: express.Request, res: express.Response) => {
  const data = await userService.login(req.body);
  return res.status(200).send(data);
});

export {
  createUser,
  verifyUser,
  loginUser,
}
