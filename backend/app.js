import express from "express";
import cors from "cors";


const app = express();

const allowedOrigins = process.env.CORS_ORIGIN;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import recommendRoutes from "./routes/movieRecommend.routes.js";
// Mount your routes here ⬇⬇⬇⬇⬇
app.use("/api", recommendRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

export default app;
