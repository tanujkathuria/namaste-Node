// basic module in the node for making api calls
const http = require("http");

const server = http.createServer(function (req, res) {
  // reply with a hello world
  if (req.url === "/getSecret") {
    res.end("hello secret");
  }
  res.end("hello world");
});

// listening on port no 7777
server.listen(7777);
