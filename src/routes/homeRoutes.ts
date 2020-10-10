import { Router } from 'express';
import HomeController from '../controllers/HomeController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.post('/', loginRequired, HomeController.index);

export default router;