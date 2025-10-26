require("./instrumentation");

const express = require("express");
const cors = require("cors");
const logger = require("../../packages/shared-utils/logger");
const app = express();

app.use(cors())

app.get("/hello", (req, res) => {
  logger.info({ route: "/hello" }, "API hit : /hello");
  res.json({ message: "Hello from API!" });
});

app.get('/test-error', (req, res) => {
  console.error("ERROR: This is a test error log");
  console.warn("WARN: This is a test warning log");
  res.json({message: "Logs sent!"});
});

app.listen(4000, () => console.log("API running on port 4000"));
