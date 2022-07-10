import { Router } from 'express';
// middlewares
import { validateSchema } from '../middlewares/schemaValidateMiddleware.js';
// schemas
import paymentSchema from '../models/paymentSchema.js';

const paymentRouter = Router();

paymentRouter.post('/payments/card/:id', validateSchema(paymentSchema));

export default paymentRouter;
