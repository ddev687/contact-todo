import { removeUndefinedProps } from '../utils/helper';
import User from '../models/user.model';

export const create = (userData) =>
    User.create({ ...removeUndefinedProps(userData) });

export const findByParams = async (params) =>
    User.find(params);

export const findOne = (params) =>
    User.findOne(params);