import { Router } from 'express';

import ClassesControlller from '../controllers/ClassesController';

const classesControllers = new ClassesControlller();

const router =  Router();

router.get('/', classesControllers.index);
router.post('/', classesControllers.store);

export default router;
