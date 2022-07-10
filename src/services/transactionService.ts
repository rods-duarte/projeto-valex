import * as rechargeRepository from '../repositories/rechargeRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import { notFoundError } from '../middlewares/errorHandlerMiddleware.js';
import { Recharge } from '../repositories/rechargeRepository.js';
import { PaymentWithBusinessName } from '../repositories/paymentRepository.js';

export async function getRecharges(cardId: number) {
  if (!cardId) {
    const message = 'Id must be a number !';
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
  const income = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const expense = recharges.reduce((acc, recharge) => acc + recharge.amount, 0);

  const balance = income - expense;
  return balance;
}
