import express from "express";
import scoresRouter from "@routes/score";
import authRouter from "@routes/auth";

const app = express();

app.use(express.json());

app.use("/api/scores", scoresRouter);
app.use("/api/auth", authRouter);

app.get("/", (_, res) => {
  console.log('SERVER DEFAULT')

  res.send("GlowingAlien API running");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});