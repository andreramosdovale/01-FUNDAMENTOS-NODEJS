import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

// req => ReadableStream
// res => WritableStream
const server = http.createServer(async (req, res) => {
  const buffer = [];

  for await (const chunk of req) {
    buffer.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffer).toString();

  return res.end(fullStreamContent);
});

server.listen(3334);
