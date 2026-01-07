import express from "express";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);



app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


import recommendRouter from "./routes/movieRecommend.routes.js";

app.use("/api",recommendRouter)

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

export default app;
