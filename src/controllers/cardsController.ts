import { Request, Response } from 'express';
// services
import * as cardsService from '../services/cardsService.js';
import * as employeeService from '../services/employeeService.js';
import * as companyService from '../services/companyService.js';
// middlewares
import * as errorHandler from '../middlewares/errorHandlerMiddleware.js';
// types
import { TransactionTypes } from '../repositories/cardRepository.js';

export async function createCard(req: Request, res: Response) {
  const employeeId: number = +req.params.employeeId;
  const apiKey = req.header('x-api-key');
  const { cardType }: { cardType: TransactionTypes } = req.body;

  if (!apiKey) {
    const message = 'Missing api key !';
    throw errorHandler.unprocessableEntity(message);
  }
  if (!employeeId) {
    const message = 'Missing employee id !';
    throw errorHandler.unprocessableEntity(message);
  }

  const company = await companyService.getCompany(apiKey);
  const employee = await employeeService.getEmployee(employeeId);

  if (employee.companyId !== company.id) {
    const message = `Employee ${employee.fullName} is not registered in the ${company.name} company !`;
    throw errorHandler.unauthorizedError(message);
  }

  await employeeService.validateEmployeeCard(cardType, employee);

  const cardholderName = cardsService.formatCardName(employee.fullName);
  const card = {
    ...cardsService.generateCardData(),
    cardholderName,
    type: cardType,
    employeeId,
    isVirtual: false,
    isBlocked: false,
  };

  cardsService.registerNewCard(card);

  res.send({ card });
}

export async function activateCard(req: Request, res: Response) {
  const cardId = +req.params.id;
  const { securityCode, password } = req.body;

  const card = await cardsService.getCard(cardId);
  cardsService.isCardValid(card);
  cardsService.validateSecurityCode(card, securityCode);
  await cardsService.registerCardPassword(card, password);

  res.status(200).send('Card activated successfully !');
}
