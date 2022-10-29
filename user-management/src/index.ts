import app from "./app";

const port = 8081;

app
  .listen(port, () => {
    console.log(`server running on port : ${port}`);
  })
  .on("error", (e: any) => console.log(e));
