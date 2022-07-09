import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { unprocessableEntity } from './errorHandlerMiddleware.js';

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error } = schema.validate(body);
    const valid = error == null;

    if (!valid) {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      throw unprocessableEntity(message);
    }

    next();
  };
}
