import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  }),
);

app.use(errorHandler);

export default app;
