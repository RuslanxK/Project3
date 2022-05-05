const express = require("express");
const movieRouter = require("./routers/movieRouter");
const memberRouter = require("./routers/memberRouter");
const userRouter = require("./routers/userRouter");
const subscriptionRouter = require("./routers/subscriptionRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = 8000;

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());

require("./configs/database");

app.use("/api/auth", require("./auth/route"));
app.use("/api/movies", movieRouter);
app.use("/api/members", memberRouter);
app.use("/api/users", userRouter);
app.use("/api/subscriptions", subscriptionRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
