import { Router } from 'express';
// controllers
import {
  activateCard,
  blockCard,
  createCard,
  getTransactions,
  unblockCard,
} from '../controllers/cardsController.js';
// middlewares
import { validateSchema } from '../middlewares/schemaValidateMiddleware.js';
// schemas
import CardTypeSchema from '../models/cardTypeSchema.js';
import cardPasswordSchema from '../models/cardPasswordSchema.js';

const cardsRouter = Router();
cardsRouter.post(
  '/cards/new/:employeeId',
  validateSchema(CardTypeSchema),
  createCard
);
cardsRouter.put(
  '/cards/:id/activate/',
  validateSchema(cardPasswordSchema),
  activateCard
);
cardsRouter.put(
  '/cards/:id/block',
  validateSchema(cardPasswordSchema),
  blockCard
);
cardsRouter.put(
  '/cards/:id/unblock',
  validateSchema(cardPasswordSchema),
  unblockCard
);
cardsRouter.get('/cards/:id/transactions', getTransactions);

export default cardsRouter;
