import { Router } from 'express';

import ClassesControlller from '../controllers/ClassesController';
import loginRequired from '../middlewares/loginRequired';

const classesControllers = new ClassesControlller();

const router =  Router();

router.get('/', loginRequired, classesControllers.index);
router.post('/', loginRequired, classesControllers.store);

export default router;
