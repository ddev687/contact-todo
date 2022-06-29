import { IContacts } from '../models/contacts.model';
import ApiError from '../utils/apiError';
import * as ContactsRepositorie from '../repositories/Contacts.repositorie';

const createContacts = async (data: IContacts) => {
  const ContactsData = {
    email: data.email,
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    userId: data.userId
  };
  const Contacts = await ContactsRepositorie.create(ContactsData);
  return Contacts;
}

const deleteContacts = async (contactId: string) => {
  if (!contactId) {
    throw new ApiError(400, 'contactId is missing');
  }
  const body = { isDeleted: true }
  await ContactsRepositorie.findByIdAndUpdate(contactId, body);
  return contactId;
}

const getAllContacts = async (userId: string) => {
  const contacts = await ContactsRepositorie.findByParams({ userId, isDeleted: false });
  return contacts;
}

export {
  createContacts,
  deleteContacts,
  getAllContacts
}
