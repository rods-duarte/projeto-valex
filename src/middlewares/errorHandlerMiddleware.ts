import type { ErrorRequestHandler } from 'express';

const serviceErrorToStatusCode = {
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  unprocessableEntity: 422,
};

export function unauthorizedError(message: string) {
  return { type: 'unauthorized', message };
}

export function conflictError(message: string) {
  return { type: 'conflict', message };
}

export function notFoundError(message: string) {
  return { type: 'notFound', message };
}

export function unprocessableEntity(message: string) {
  return { type: 'unprocessableEntity', message };
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const { type, message }: { type: string; message: string } = error;
  if (type) {
    return res.status(serviceErrorToStatusCode[type]).send(message);
  }

  return res.status(500).send('Internal server error !');
};

export default errorHandler;
