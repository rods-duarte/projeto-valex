import { Request, Response } from 'express';
// services
import {
  getEmployee,
  validateEmployeeCard,
} from '../services/employeeService.js';
import { getCompany } from '../services/companyService.js';
// middlewares
import {
  unauthorizedError,
  unprocessableEntity,
} from '../middlewares/errorHandlerMiddleware.js';
// types
import { TransactionTypes } from '../repositories/cardRepository.js';
import {
  formatCardName,
  generateCardData,
  registerNewCard,
} from '../services/cardsService.js';

export async function createCard(req: Request, res: Response) {
  const employeeId: number = +req.params.id;
  const apiKey = req.header('x-api-key');
  const { cardType }: { cardType: TransactionTypes } = req.body;

  if (!apiKey) {
    const message = 'Missing api key !';
    throw unprocessableEntity(message);
  }
  if (!employeeId) {
    const message = 'Missing employee id !';
    throw unprocessableEntity(message);
  }

  const company = await getCompany(apiKey);
  const employee = await getEmployee(employeeId);

  if (employee.companyId !== company.id) {
    const message = `Employee ${employee.fullName} is not registered in the ${company.name} company !`;
    throw unauthorizedError(message);
  }

  await validateEmployeeCard(cardType, employee);

  const cardholderName = formatCardName(employee.fullName);
  const card = {
    ...generateCardData(),
    cardholderName,
    type: cardType,
    employeeId,
    isVirtual: false,
    isBlocked: false,
  };

  registerNewCard(card);

  res.send({ card });
}
