import { Router } from 'express'
import {
    contactsCreateValidator,
    contactsDeleteValidator,
} from '../validators/Contacts.validator';
import {
    createContacts,
    deleteContacts,
    getAllContacts
} from '../controllers/Contacts.controller';
import { authorize } from "../middleware/authorize";

const router = Router({ mergeParams: true })

router.post('/create', contactsCreateValidator(), authorize, createContacts);
router.delete('/delete/:contactId', contactsDeleteValidator(), authorize, deleteContacts);
router.get('/getAll', authorize, getAllContacts);


export default router

