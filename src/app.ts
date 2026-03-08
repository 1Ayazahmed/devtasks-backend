import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorMiddleware";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes"
import { apiLimiter } from "./middleware/rateLimit.middleware";



const app = express();
app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api", apiLimiter);  //100 requests per 15 minutes per IP

app.use("/api/auth", authRoutes);  

app.use("/api/tasks", taskRoutes); 

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(errorHandler);

export default app;