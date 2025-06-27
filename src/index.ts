import express, { Application } from "express";
import dotenv from "dotenv";
import { middlewareConfig } from "./config/middleware.config";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import path from "path";

const PORT = process.env.PORT || 4000;
dotenv.config();
//INIT APP
const app: Application = express();
const isDev = process.env.NODE_ENV === "development";

//MIDDLEWARE
middlewareConfig(app);

//ROUTES
import workoutRoutes from "./routes/workout.routes";
app.use("/api", workoutRoutes);

import sessionRoutes from "./routes/session.routes";
app.use("/api", sessionRoutes);

//STATIC FILES

// Serve static files from Vue build
console.log(process.env.NODE_ENV);
if (isDev) {
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.get(/(.*)/, (_, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "..", "..", "public")));
  app.get(/(.*)/, (_, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
  });
}
// Catch-all route to serve index.html (for Vue Router)

//ERROR HANDLING
app.use(notFoundHandler);
app.use(errorHandler);

//START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
