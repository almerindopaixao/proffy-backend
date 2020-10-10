import { Router } from 'express';

import UserControlller from '../controllers/UserController';

const userControllers = new UserControlller();

const router =  Router();

router.post('/', userControllers.store);

export default router;
