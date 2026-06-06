import { routes } from '../routes/index.routes.js';
import { extractQueryParams } from '../utils/extract-query-params.js';

export function routeHandler(req, res) {
  const route = routes.find(route => route.method === req.method && route.path.test(req.url));

  if (!route) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Route not found' }));
  }

  const routeParams = req.url.match(route.path);
  const { query, ...params } = routeParams.groups;

  req.params = params;
  req.query = query ? extractQueryParams(query) : {};

  return route.handler(req, res);
}
