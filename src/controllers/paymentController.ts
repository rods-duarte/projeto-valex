import { Request, Response } from 'express';
import * as cardService from '../services/cardsService.js';
import * as businessService from '../services/businessService.js';
import * as transactionService from '../services/transactionService.js';
import { unauthorizedError } from '../middlewares/errorHandlerMiddleware.js';

export async function payment(req: Request, res: Response) {
  const cardId = +req.params.id;
  const { cardPassword, amount, businessId } = req.body;

  const business = await businessService.getBusiness(businessId);
  const card = await cardService.getCard(cardId);

  cardService.isCardBlocked(card);
  cardService.isCardValid(card);
  cardService.isCardActivated(card);
  cardService.validatePassword(card, cardPassword);
  transactionService.validateCardType(card, business);

  const recharges = await transactionService.getRecharges(cardId);
  const payments = await transactionService.getPayments(cardId);
  const balance = transactionService.calculateBalance(recharges, payments);

  if (balance < amount) {
    const message = 'Insufficient balance to complete the purchase !';
    throw unauthorizedError(message);
  }

  await transactionService.registerPayment(card, business, amount);
  res.status(200).send('Successful purchase !');
}
