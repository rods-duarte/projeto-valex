import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import dayjs from 'dayjs';
import * as cardRepository from '../repositories/cardRepository.js';

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
