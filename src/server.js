import http from 'node:http';
import { jsonHandler } from './middlewares/json-handler.js';
import { routeHandler } from './middlewares/route-handler.js';

const app = http.createServer(async (req, res) => {
  await jsonHandler(req, res);
  routeHandler(req, res);
});

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
