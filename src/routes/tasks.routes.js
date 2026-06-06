import { TaskController } from '../controllers/Task-Controler.js';
import { buildRoutePath } from '../utils/build-route-path.js';

const taskController = new TaskController();

export const taskRoutes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: taskController.index,
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: taskController.create,
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: taskController.update,
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: taskController.delete,
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id'),
    handler: taskController.complete,
  },
];
