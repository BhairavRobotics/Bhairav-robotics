export const handleHealthRoute = (_req, res, sendJson) => {
  sendJson(res, 200, {
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};
