import { Router } from 'express'
import {
    registerValidator,
    verificationValidator,
    loginValidator,
} from '../validators/user.validator';
import {
    createUser,
    verifyUser,
    loginUser,
} from '../controllers/user.controller';

const router = Router({ mergeParams: true })

router.post('/register', registerValidator(), createUser);
router.get('/verify', verificationValidator(), verifyUser);
router.post('/login', loginValidator(), loginUser);
export default router

