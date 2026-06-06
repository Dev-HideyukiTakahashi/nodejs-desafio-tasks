import { Database } from '../database.js';
import crypto from 'crypto';
import { errorHandler } from '../middlewares/error-handler.js';

const database = new Database();

export class TaskController {
  async create(req, res) {
    const body = {
      id: crypto.randomUUID(),
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...req.body,
    };

    const data = await database.insert('tasks', body);

    return res.writeHead(201).end(JSON.stringify(data));
  }

  async index(req, res) {
    const { search } = req.query ?? null;

    const data = await database.select('tasks', search);

    return res.end(JSON.stringify(data));
  }

  async update(req, res) {
    const id = req.params.id;
    const body = {
      ...req.body,
      updated_at: new Date().toISOString(),
    };

    const data = await database.update('tasks', body, id);

    if (!data) return errorHandler(res, 'notFound');

    return res.end(JSON.stringify(data));
  }

  async delete(req, res) {
    const isDeleted = database.delete('tasks', req.params.id);

    if (!isDeleted) return errorHandler(res, 'notFound');

    return res.writeHead(204).end();
  }

  async complete(req, res) {
    const id = req.params.id;
    const body = {
      ...req.body,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const data = await database.complete('tasks', body, id);

    if (!data) return errorHandler(res, 'notFound');

    return res.end(JSON.stringify(data));
  }
}
