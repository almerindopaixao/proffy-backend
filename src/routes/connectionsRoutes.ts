import { Router } from 'express';

import ConnectionsController from '../controllers/ConnectionsController';
import loginRequired from '../middlewares/loginRequired';

const connectionsController = new ConnectionsController();

const router =  Router();

router.get('/', loginRequired, connectionsController.index);
router.post('/', loginRequired, connectionsController.store);

export default router;
