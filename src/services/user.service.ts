import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { sendSignupEmail } from '../utils/emailHelper';
import { IUser } from '../models/user.model';
import config from "../config";
import ApiError from '../utils/apiError';
import * as UserRepositorie from '../repositories/user.repositorie';
import { IContacts } from '../models/contacts.model';
const jwt = require('jsonwebtoken');

const createUser = async (data: IContacts) => {
  const userData = {
    email: data.email,
    emailVerified: false,
    fullName: data.fullName,
    passwordHash: bcrypt.hashSync(data.password, 10),
    verifyToken: uuidv4()
  };
  const user = await UserRepositorie.create(userData);
  sendSignupEmail(userData.fullName, userData.email, 'Verify your account', userData.verifyToken)
  return user;
}

const verifyUser = async (data) => {
  const user: IUser | null = await UserRepositorie.findOne(data);
  if (!user) {
    throw new ApiError(400, 'Invalid verify token!');
  }
  if (user.emailVerified === true) {
    throw new ApiError(400, 'This account has already been verified');
  }
  user.emailVerified = true;
  await user.save();
  return 'Email verifyed successfully'
}

const login = async (body: { email: string, password: string }) => {
  const user: IUser | null = await UserRepositorie.findOne({ email: body.email })
  if (!user) {
    throw new ApiError(400, `User email is incorrect!`);
  } else if (user.isDeleted) {
    throw new ApiError(400, 'User not available');
  }
  const result = await bcrypt.compare(body.password, user.passwordHash);
  if (!result) {
    throw new ApiError(400, 'Please enter correct password');
  }

  if (!(user.emailVerified)) {
    throw new ApiError(400, 'This account not verified');
  }
  const accessToken = await generateJwtToken(user, config.accessTokenSecret, '1d');
  return { user, accessToken }
}

const generateJwtToken = async (user: IUser, secret: string, time: string) => {
  return jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: time });
};

export {
  createUser,
  verifyUser,
  login,
}
