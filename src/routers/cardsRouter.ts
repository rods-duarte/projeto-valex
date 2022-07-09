import { Router } from 'express';
// controllers
import { createCard } from '../controllers/cardsController.js';
// middlewares
import { validateSchema } from '../middlewares/schemaValidateMiddleware.js';
// schemas
import CardTypeSchema from '../models/cardTypeSchema.js';

const cardsRouter = Router();
cardsRouter.post('/cards/:id', validateSchema(CardTypeSchema), createCard);

export default cardsRouter;
