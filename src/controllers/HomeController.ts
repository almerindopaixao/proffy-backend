// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';

class HomeController {
  static index(req: Request, res: Response) {
    return res.json({
      welcome: ['Bem vindo a API'],
    })
  }
}

export default HomeController;