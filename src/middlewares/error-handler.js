/**
 * @param {'notFound' | 'internal'} type - O tipo de erro permitido pelo dicionário
 */
export function errorHandler(res, type) {
  const error = {
    notFound: {
      status: 404,
      message: 'Resource not found',
    },
    internal: {
      status: 500,
      message: 'Internal Server Error',
    },
  };

  const currentError = error[type];

  return res.writeHead(currentError.status).end(JSON.stringify({ error: currentError.message }));
}
