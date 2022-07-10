import { notFoundError } from '../middlewares/errorHandlerMiddleware.js';
import * as businessRepository from '../repositories/businessRepository.js';

export async function getBusiness(id: number) {
  if (!id) {
    const message = 'Business Id must be a number !';
    throw notFoundError(message);
  }

  const business = await businessRepository.findById(id);

  if (!business) {
    const message = `Business with id ${id} not found !`;
    throw notFoundError(message);
  }

  return business;
}
