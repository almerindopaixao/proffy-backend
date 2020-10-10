/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionsController {
  async index(request: Request, response: Response) {
    const totalConnections = await db('connections').count('* as total');

    const { total } = totalConnections[0];

    return response.json({ total });
  }
  
  async store(request: Request, response: Response) {
    const { teacher_id } = request.body;

    await db('connections').insert({
      teacher_id,
    });

    return response.status(201).send('Sucesso');
  }
}