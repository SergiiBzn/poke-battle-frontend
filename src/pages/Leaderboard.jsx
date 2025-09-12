import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function fetchLeaderboard() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/leaderboard?limit=10`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to load leaderboard");
        const data = await res.json();
        if (!ignore) setPlayers(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!ignore && e.name !== "AbortError") setError(e.message || "Error");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchLeaderboard();
    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">Top players</h1>

      {loading && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-14 rounded-xl bg-gray-200/70"
            />
          ))}
        </div>
      )}

      {error && (
        <div
          className="text-red-700 bg-red-50 border border-red-200 rounded-xl p-3"
          role="alert"
        >
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {players.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-600">
              No players yet — be the first to battle!
            </div>
          ) : (
            <ol className="space-y-3">
              {players.map((p, idx) => {
                const rank = idx + 1;
                const rankColors =
                  rank === 1
                    ? "bg-yellow-400 text-yellow-900"
                    : rank === 2
                    ? "bg-gray-300 text-gray-800"
                    : rank === 3
                    ? "bg-amber-600 text-amber-50"
                    : "bg-gray-100 text-gray-600";

                return (
                  <li
                    key={p._id || `${p.username}-${idx}`}
                    className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm hover:shadow-md transition"
                  >
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-base font-bold ${rankColors}`}
                      aria-label={`Rank ${rank}`}
                    >
                      {rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-base font-semibold text-gray-900">
                        {p.username}
                      </p>
                      <p className="text-sm text-gray-500">Score</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold tabular-nums text-gray-800">
                        {p.score}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
