import { Router } from 'express';
import cardsRouter from './cardsRouter.js';
import paymentRouter from './paymentRouter.js';

const router = Router();
router.use(cardsRouter);

export default router;
