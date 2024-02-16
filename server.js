const express = require("express");
const app = express();

app.get("/alpha", (_, res) => {
  setTimeout(() => {
    return res.sendStatus(200);
  }, 3000);
});

app.get("/beta", (_, res) => {
  setTimeout(() => {
    return res.sendStatus(200);
  }, 5000);
});

const port = 13000;
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
