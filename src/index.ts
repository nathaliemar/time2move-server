import express, { Application } from "express";
import dotenv from "dotenv";
import { middlewareConfig } from "./config/middleware.config";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const PORT = process.env.PORT || 4000;
dotenv.config();
//INIT APP
const app: Application = express();

//MIDDLEWARE
middlewareConfig(app);

//ROUTES
import workoutRoutes from "./routes/workout.routes";
app.use("/api", workoutRoutes);

import sessionRoutes from "./routes/session.routes";
app.use("/api", sessionRoutes);

//ERROR HANDLING
app.use(notFoundHandler);
app.use(errorHandler);

//START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
