/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import { Raw } from 'knex';
import db from '../database/connection';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Você precisa fazer o login']
    });
  }

  const token = authorization.split(' ')[1];

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRETS as string);

    const { id, email } = data as {id: Raw<any>, email: Raw<any>};

    const user = await db('users')
    .where('users.email', '=', email)
    .where('users.id', '=', id)
    .select('*');

    if (user.length === 0) {
      throw new Error();
    }

    return next();

  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
}