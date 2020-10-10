/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import UserModel from '../model/UserModel';

export default class UserController {
  // eslint-disable-next-line class-methods-use-this
  async store(req: Request, res: Response) {
    try {
      await UserModel.register(req.body);

      if (UserModel.errors.length > 0) {
         return res.status(400).json({
          errors: UserModel.errors,
        })
      }

      return res.status(201).json({
        success: [`Cadastro efetuado com sucesso`],
      })
    } catch (e) {
      console.log(e);
    }
  }
   
}