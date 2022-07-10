import {
  conflictError,
  notFoundError,
} from '../middlewares/errorHandlerMiddleware.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import * as cardRepository from '../repositories/cardRepository.js';
import { TransactionTypes } from '../repositories/cardRepository.js';
import { Employee } from '../repositories/employeeRepository.js';

export async function getEmployee(id: number) {
  if (!id) {
    const message = 'Missing employee id !';
    throw notFoundError(message);
  }

  const employee = await employeeRepository.findById(id);
  if (!employee) {
    const message = 'Employee not found !';
    throw notFoundError(message);
  }
  return employee;
}

export async function validateEmployeeCard(
  type: TransactionTypes,
  employee: Employee
) {
  const card = await cardRepository.findByTypeAndEmployeeId(type, employee.id);

  if (card) {
    const message = `Employee ${employee.fullName} already have ${type} card`;
    throw conflictError(message);
  }
}
