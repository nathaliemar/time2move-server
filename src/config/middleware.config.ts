import express from "express";
import morgan from "morgan";
import cors from "cors";

function middlewareConfig(app: express.Application) {
  app.use(express.json());
  app.use(morgan("dev"));

  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:5174"];

  app.use(cors({ origin: allowedOrigins }));
}
export { middlewareConfig };
