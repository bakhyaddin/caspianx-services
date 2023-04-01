import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send({
    "x-access-token": req.headers["x-access-token"],
    "x-refresh-token": req.headers["x-refresh-token"],
    "x-id-token": req.headers["x-id-token"],
  });
});

app.post("/", (req, res) => {
  console.log({ headers: req.headers });
  res.send({
    foo: "bar",
  });
});

export default app;
