import http from "node:http";

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users")
    return res
      .setHeader("Content-type", "aplication/json")
      .end(JSON.stringify(users));

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "john doe",
      email: "johndoe@exemple.com",
    });

    return res.writeHead(201).end("Criação de usuarios");
  }

  return res.writeHead(404).end("Conteudo não encontrado");
});

server.listen(3333);
