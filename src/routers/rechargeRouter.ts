import { Router } from 'express';
// controllers
import { recharge } from '../controllers/rechargeController.js';
// middlewares
import { validateSchema } from '../middlewares/schemaValidateMiddleware.js';
// schemas
import rechargeSchema from '../models/rechargeSchema.js';

const rechargeRouter = Router();

rechargeRouter.post(
  '/recharges/card/:id',
  validateSchema(rechargeSchema),
  recharge
);

export default rechargeRouter;
