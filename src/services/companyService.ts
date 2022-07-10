import {
  notFoundError,
  unauthorizedError,
} from '../middlewares/errorHandlerMiddleware.js';
import * as companyRepository from '../repositories/companyRepository.js';

export async function getCompany(apiKey: string) {
  if (!apiKey) {
    const message = 'Missing api key !';
    throw notFoundError(message);
  }

  const company = await companyRepository.findByApiKey(apiKey);

  if (!company) {
    const message = 'Invalid API key !';
    throw unauthorizedError(message);
  }

  return company;
}
