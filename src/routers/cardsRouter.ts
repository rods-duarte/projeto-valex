import { Router } from 'express';
// controllers
import { activateCard, createCard } from '../controllers/cardsController.js';
// middlewares
import { validateSchema } from '../middlewares/schemaValidateMiddleware.js';
// schemas
import CardTypeSchema from '../models/cardTypeSchema.js';
import cardAuthSchema from '../models/cardAuthSchema.js';

const cardsRouter = Router();
cardsRouter.post(
  '/cards/:employeeId',
  validateSchema(CardTypeSchema),
  createCard
);
cardsRouter.put(
  '/cards/activate/:id',
  validateSchema(cardAuthSchema),
  activateCard
);

export default cardsRouter;
