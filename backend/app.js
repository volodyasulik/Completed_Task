const express = require("express");
const cors = require("cors");
const trainsRouter = require("./routers/trainsRouter");
const cityRouter = require("./routers/citysRouter");

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

app.use("/trains", trainsRouter);
app.use("/citys", cityRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
