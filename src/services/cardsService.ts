import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import dayjs from 'dayjs';
import {
  conflictError,
  forbiddenError,
  notFoundError,
  unauthorizedError,
} from '../middlewares/errorHandlerMiddleware.js';
import * as cardRepository from '../repositories/cardRepository.js';
import { Card } from '../repositories/cardRepository.js';

export function formatCardName(fullName: string) {
  const regex = /\b[A-Z].*?\b/g;
  const capitalFullName = fullName.match(regex);

  for (let i = 1; i < capitalFullName.length - 1; i++) {
    capitalFullName[i] = capitalFullName[i][0]; //eslint-disable-line
  }

  const cardholderName = capitalFullName.join(' ').toUpperCase();
  return cardholderName;
}

export function generateCardData() {
  const cryptr = new Cryptr(process.env.SECRET_KEY);

  const number = faker.finance.creditCardNumber();
  const securityCode = faker.finance.creditCardCVV();
  const encryptedSecurityCode = cryptr.encrypt(securityCode);
  const expirationDate = dayjs().add(5, 'year').format('MM/YY');

  return {
    securityCode: encryptedSecurityCode,
    number,
    expirationDate,
  };
}

export async function registerNewCard(card: any) {
  await cardRepository.insert(card);
}

export async function getCard(id: number) {
  if (!id) {
    const message = 'Id must be a number !';
    throw notFoundError(message);
  }

  const card = await cardRepository.findById(id);

  if (!card) {
    const message = 'Card not found !';
    throw notFoundError(message);
  }

  return card;
}

export function validateSecurityCode(card: Card, securityCode: string) {
  const cryptr = new Cryptr(process.env.SECRET_KEY);
  const CardSecurityCode = cryptr.decrypt(card.securityCode);

  if (securityCode !== CardSecurityCode) {
    const message = 'Invalid security code !';
    throw unauthorizedError(message);
  }
}

export function validatePassword(card: Card, password: string) {
  const cryptr = new Cryptr(process.env.SECRET_KEY);
  const cardPassword = cryptr.decrypt(card.password);

  if (password !== cardPassword) {
    const message = 'Wrong password !';
    throw unauthorizedError(message);
  }
}

export function isCardValid(card: Card) {
  const [todayMonth, todayYear] = dayjs().format('MM/YY').split('/');
  const [expMonth, expYear] = card.expirationDate.split('/');

  if (todayYear > expYear || (todayYear === expYear && todayMonth > expMonth)) {
    const message = 'Card expired !';
    throw forbiddenError(message);
  }
}

export function isCardBlocked(card: Card) {
  if (card.isBlocked) {
    const message = 'Card is already blocked';
    throw conflictError(message);
  }
}

export function isCardActivated(card: Card) {
  if (card.password === null) {
    const message = 'Card not activated !';
    throw unauthorizedError(message);
  }
}

export async function toggleBlockCard(card: Card) {
  const { id, isBlocked } = card;
  await cardRepository.update(id, { isBlocked: !isBlocked });
}

export async function registerCardPassword(card: Card, password: string) {
  const cryptr = new Cryptr(process.env.SECRET_KEY);
  if (card.password !== null) {
    const message = 'Card has already been activated !';
    throw forbiddenError(message);
  }

  const cryptedPassword = cryptr.encrypt(password);

  await cardRepository.update(card.id, { password: cryptedPassword });
}
