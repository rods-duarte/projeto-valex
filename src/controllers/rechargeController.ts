import { Request, Response } from 'express';
import * as companyService from '../services/companyService.js';
import * as cardService from '../services/cardsService.js';
import * as transactionService from '../services/transactionService.js';

export async function recharge(req: Request, res: Response) {
  const apiKey = req.header('x-api-key');
  const cardId = +req.params.id;
  const { amount } = req.body;

  await companyService.getCompany(apiKey);
  const card = await cardService.getCard(cardId);
  cardService.isCardActivated(card);
  cardService.isCardValid(card);
  transactionService.registerRecharge(card, amount);

  res.status(200).send('Successfully recharged !');
}
