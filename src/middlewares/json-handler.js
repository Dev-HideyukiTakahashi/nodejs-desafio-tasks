export async function jsonHandler(req, res) {
  const buffers = [];

  for await (let chunk of req) {
    buffers.push(chunk);
  }

  try {
    const data = Buffer.concat(buffers).toString('utf-8');

    req.body = data.trim() ? JSON.parse(data) : null;
  } catch (error) {
    console.log('Json parse error : ', error);
    req.body = null;
  }

  res.setHeader('Content-Type', 'application/json');
}
