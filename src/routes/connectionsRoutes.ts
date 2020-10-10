import { Router } from 'express';

import ConnectionsController from '../controllers/ConnectionsController';

const connectionsController = new ConnectionsController();

const router =  Router();

router.get('/', connectionsController.index);
router.post('/', connectionsController.store);

export default router;
