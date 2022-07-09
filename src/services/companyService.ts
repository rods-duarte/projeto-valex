import { unauthorizedError } from '../middlewares/errorHandlerMiddleware.js';
import * as companyRepository from '../repositories/companyRepository.js';

export async function getCompany(apiKey: string) {
  const company = await companyRepository.findByApiKey(apiKey);

  if (!company) {
    const message = 'Invalid API key !';
    throw unauthorizedError(message);
  }

  return company;
}
