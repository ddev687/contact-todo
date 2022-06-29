import express from 'express';
import * as ContactsService from "../services/contacts.service";
import catchAsync from '../utils/catchAsync';

const createContacts = catchAsync(async (req: express.Request, res: express.Response) => {
  const contacts = await ContactsService.createContacts({ ...req.body, userId: req['user']._id });
  return res.status(200).send(contacts);
});

const deleteContacts = catchAsync(async (req: express.Request, res: express.Response) => {
  console.log('========= from controller ', req.params.contactId)
  const contactId = await ContactsService.deleteContacts(req.params.contactId);
  return res.status(200).send({ message: `Contact ${contactId} deleted successfully` });
});

const getAllContacts = catchAsync(async (req: express.Request, res: express.Response) => {
  const contacts = await ContactsService.getAllContacts(req['user']._id);
  return res.status(200).send(contacts);
});

export {
  createContacts,
  deleteContacts,
  getAllContacts
}
