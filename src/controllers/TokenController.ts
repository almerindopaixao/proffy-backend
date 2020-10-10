// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

import db from '../database/connection';

class TokenController {
  static async store(req: Request, res: Response) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Você precisa informar o email ou a senha para podermos gerar o token '],
      })
    }

    const user = await db('users')
      .where('users.email', '=', email)
      .select('*');

    console.log(`eeeeeeeeeeeeei ${user}`);

    if (user.length === 0) {
      return res.status(401).json({
        erros: ['O e-mail informado não está cadastrado na plataforma'],
      })
    }

    if (!(await bcrypt.compare(password, user[0].password))) {
      return res.status(401).json({
        errors: ['Senha Inválida'],
      });
    }

    const { id } = user[0];

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRETS as string, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    })

    return res.json({
      token,
      user: {
        nome: user[0].name,
        email,
        id,
      }
    })

  }
}

export default TokenController;