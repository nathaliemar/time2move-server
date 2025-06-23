import express from "express";
import morgan from "morgan";
import cors from "cors";

function middlewareConfig(app: express.Application) {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors());
}
export { middlewareConfig };
