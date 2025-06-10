import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Routes
app.get("/api/health", (req, res) => {
  res.json({
    message: "Silas React Sandbox API is running!",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from the backend!",
    data: {
      framework: "Express.js",
      language: "TypeScript",
      environment: process.env.NODE_ENV || "development",
    },
  });
});

// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
});
