import { removeUndefinedProps } from '../utils/helper';
import Contacts from '../models/contacts.model';

export const create = (ContactsData) =>
    Contacts.create({ ...removeUndefinedProps(ContactsData) });

export const findByParams = async (params) =>
    Contacts.find(params);

export const findOne = (params) =>
    Contacts.findOne(params);

export const findByIdAndUpdate = (id, body) =>
    Contacts.findByIdAndUpdate({ _id: id }, body);