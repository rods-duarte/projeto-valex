import { Router } from 'express';
// controllers
import { payment } from '../controllers/paymentController.js';
// middlewares
import { validateSchema } from '../middlewares/schemaValidateMiddleware.js';
// schemas
import paymentSchema from '../models/paymentSchema.js';

const paymentRouter = Router();

paymentRouter.post(
  '/payments/card/:id',
  validateSchema(paymentSchema),
  payment
);

export default paymentRouter;
