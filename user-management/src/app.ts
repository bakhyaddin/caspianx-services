import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({
    "x-access-token": req.headers["x-access-token"],
    "x-refresh-token": req.headers["x-refresh-token"],
    "x-id-token": req.headers["x-id-token"],
  });
});

export default app;
