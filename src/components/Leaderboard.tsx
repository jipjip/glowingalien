import useSWR from "swr";

type Player = {
  player: string;
  score: number;
}

type ScoresResponse = {
  status: string;
  message: string;
  scores: Player[];
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

type Props = {
  gameSlug: string;
  limit?: number;
};

export default function Leaderboard({ gameSlug, limit = 10 }: Props) {

  const { data, error } = useSWR<ScoresResponse>(
    `/api/scores?game=${gameSlug}&limit=${limit}`,
    fetcher,
    {
      refreshInterval: 5000
    }
  );

  console.log(data);

  if (error) return <p>Failed to load leaderboard</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Leaderboard</h2>

      <ol>
        {data.scores.map((score, i) => (
          <li key={i}>
            {score.player} — {score.score}
          </li>
        ))}
      </ol>
    </div>
  );
}