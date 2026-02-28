import { createServer } from "node:http";
import env from "./config/env.js";
import { handleHealthRoute } from "./routes/health.js";
import { handleRootRoute } from "./routes/root.js";

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
};

const routes = {
  "GET /": handleRootRoute,
  "GET /api/health": handleHealthRoute,
};

const server = createServer((req, res) => {
  const routeKey = `${req.method} ${req.url}`;
  const routeHandler = routes[routeKey];

  if (!routeHandler) {
    return sendJson(res, 404, { error: "Not Found" });
  }

  return routeHandler(req, res, sendJson);
});

server.listen(env.port, () => {
  console.log(`Backend running on http://localhost:${env.port}`);
});
