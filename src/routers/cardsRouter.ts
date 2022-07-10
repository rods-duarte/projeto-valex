import { Router } from 'express';
// controllers
import {
  activateCard,
  createCard,
  getTransactions,
} from '../controllers/cardsController.js';
// middlewares
import { validateSchema } from '../middlewares/schemaValidateMiddleware.js';
// schemas
import CardTypeSchema from '../models/cardTypeSchema.js';
import cardAuthSchema from '../models/cardAuthSchema.js';

const cardsRouter = Router();
cardsRouter.post(
  '/cards/new/:employeeId',
  validateSchema(CardTypeSchema),
  createCard
);
cardsRouter.put(
  '/cards/:id/activate/',
  validateSchema(cardAuthSchema),
  activateCard
);
cardsRouter.get('/cards/:id/transactions', getTransactions);

export default cardsRouter;
