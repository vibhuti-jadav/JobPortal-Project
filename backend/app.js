import express from "express";
import jobRouter from "./router/jobRouter.js";
import httpError from "./middleware/errorHandlig.js";
import connectDb from "./config/db.js";

const app = express();
app.use(express.json());

app.use("/job", jobRouter);

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

app.use((req, res, next) => {
  return next(new httpError("router not found", 404));
});

app.use((error, req, res, next) => {
  if (req.headersSent) {
    return next(error);
  }
  res
    .status(error.statusCode || 500)
    .json(error.message || "somthing went wrong please try again");
});

const PORT = 5000;

const startServer = async () => {
  try {
    const connect = await connectDb();
    if (!connect) {
      console.log("db failed to connect");
    }
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`server runnig on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
