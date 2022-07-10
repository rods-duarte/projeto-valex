import * as rechargeRepository from '../repositories/rechargeRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import {
  notFoundError,
  unauthorizedError,
} from '../middlewares/errorHandlerMiddleware.js';
import { Recharge } from '../repositories/rechargeRepository.js';
import { PaymentWithBusinessName } from '../repositories/paymentRepository.js';
import { Card } from '../repositories/cardRepository.js';
import { Business } from '../repositories/businessRepository.js';

export async function getRecharges(cardId: number) {
  if (!cardId) {
    const message = 'Card id must be a number !';
    throw notFoundError(message);
  }

  const recharges = await rechargeRepository.findByCardId(cardId);

  if (!recharges) {
    const message = 'Card not found !';
    throw notFoundError(message);
  }

  return recharges;
}

export async function getPayments(cardId: number) {
  if (!cardId) {
    const message = 'Id must be a number !';
    throw notFoundError(message);
  }

  const payments = await paymentRepository.findByCardId(cardId);

  if (!payments) {
    const message = 'Card not found !';
    throw notFoundError(message);
  }

  return payments;
}

export function calculateBalance(
  recharges: Recharge[],
  payments: PaymentWithBusinessName[]
) {
  const income = recharges.reduce((acc, recharge) => acc + recharge.amount, 0);
  const expense = payments.reduce((acc, payment) => acc + payment.amount, 0);

  const balance = income - expense;
  return balance;
}

export async function registerPayment(
  card: Card,
  business: Business,
  amount: number
) {
  await paymentRepository.insert({
    cardId: card.id,
    businessId: business.id,
    amount,
  });
}

export async function registerRecharge(card: Card, amount: number) {
  await rechargeRepository.insert({ cardId: card.id, amount });
}

export function validateCardType(card: Card, business: Business) {
  if (card.type !== business.type) {
    const message = `Card is not allowed to do ${business.type} transaction type`;
    throw unauthorizedError(message);
  }
}
