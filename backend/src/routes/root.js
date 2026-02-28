export const handleRootRoute = (_req, res, sendJson) => {
  sendJson(res, 200, {
    service: "bhairav-robotics-api",
    status: "ok",
  });
};
