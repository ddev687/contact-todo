import express from 'express'
import user from './user.route'
import contact from './contacts.route'

const router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => res.send('Contacts Todo'))

router.use('/user', user);
router.use('/contact', contact);

export default router;
