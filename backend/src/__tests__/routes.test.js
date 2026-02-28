import test from "node:test";
import assert from "node:assert/strict";
import { handleRootRoute } from "../routes/root.js";
import { handleHealthRoute } from "../routes/health.js";

const createMock = () => {
  const response = {
    statusCode: 0,
    payload: null,
  };

  const sendJson = (_res, statusCode, payload) => {
    response.statusCode = statusCode;
    response.payload = payload;
  };

  return { response, sendJson };
};

test("handleRootRoute returns service status", () => {
  const { response, sendJson } = createMock();

  handleRootRoute({}, {}, sendJson);

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.payload, {
    service: "bhairav-robotics-api",
    status: "ok",
  });
});

test("handleHealthRoute returns expected metadata", () => {
  const { response, sendJson } = createMock();

  handleHealthRoute({}, {}, sendJson);

  assert.equal(response.statusCode, 200);
  assert.equal(response.payload.status, "healthy");
  assert.equal(typeof response.payload.uptime, "number");
  assert.equal(typeof response.payload.timestamp, "string");
});
