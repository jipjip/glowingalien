import { Router } from "express";
import { getLeaderboard, submitScore } from "@services/scoreService";

const router = Router();

router.get("/:gameId", async (req, res) => {
  const gameId = Number(req.params.gameId);

  const leaderboard = await getLeaderboard(gameId);
  console.log('GAMEID');

  res.json(leaderboard);
});

router.post("/", async (req, res) => {
  const { userId, gameId, score } = req.body;

  const result = await submitScore(userId, gameId, score);

  res.json(result);
});

router.get("/", (req, res) => {
  console.log('DEFAULT');

  res.json({
    status: "ok",
    message: "scores endpoint works",
    scores: [
      { player: "Alice", score: 1200 },
      { player: "Bob", score: 950 },
      { player: "Ellen", score: 870 }
    ]
  });
});

export default router;