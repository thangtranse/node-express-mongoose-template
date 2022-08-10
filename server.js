const express = require("express");
const app = express();
const userRoute = require("./routes/user.route");

require("dotenv").config();

const createError = require("http-errors");

app.get("/", (req, res, next) => {
  res.send("Hello World");
});
app.use("/user", userRoute);

app.use((req, res, next) => {
  //   const error = new Error("Not found");
  //   error.status = 500;
  //   next(error);
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
