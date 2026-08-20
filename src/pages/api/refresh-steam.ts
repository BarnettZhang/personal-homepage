// ============================================================
//  /api/refresh-steam — 服务端代理 Steam API，刷新游戏库数据
// ============================================================
export const prerender = false;

interface SteamGameRaw {
  appid: number;
  name: string;
  playtime_forever: number;
  rtime_last_played: number;
}

interface SteamRecentRaw {
  appid: number;
  playtime_2weeks: number;
}

interface OutputGame {
  appId: number;
  name: string;
  playtimeMinutes: number;
  playtimeHours: number;
  lastPlayed: number;
  recentPlaytime: number;
}

async function steamFetch<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(path, "https://api.steampowered.com");
  url.searchParams.set("key", import.meta.env.STEAM_API_KEY!);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Steam API ${res.status}`);
  return (await res.json()) as T;
}

export async function GET() {
  try {
    const steamId = import.meta.env.STEAM_ID;
    if (!steamId) {
      return new Response(JSON.stringify({ error: "STEAM_ID not configured" }), {
        status: 500,
      });
    }

    const [playerRes, gamesRes] = await Promise.all([
      steamFetch<{ response: { players: { personaname: string; avatarfull: string; profileurl: string }[] } }>(
        "/ISteamUser/GetPlayerSummaries/v2/", { steamids: steamId }
      ),
      steamFetch<{ response: { game_count: number; games: SteamGameRaw[] } }>(
        "/IPlayerService/GetOwnedGames/v1/", {
          steamid: steamId,
          include_appinfo: "true",
          include_played_free_games: "true",
        }
      ),
    ]);

    const player = playerRes.response.players[0];

    const recentPlaytimes = new Map<number, number>();
    try {
      const recentRes = await steamFetch<{ response: { games: SteamRecentRaw[] } }>(
        "/IPlayerService/GetRecentlyPlayedGames/v1/", { steamid: steamId, count: "100" }
      );
      for (const g of recentRes.response.games) {
        recentPlaytimes.set(g.appid, g.playtime_2weeks);
      }
    } catch { /* ignore */ }

    const featuredAppIds = ["1245620", "271590", "1687950", "1086940"];

    const games: OutputGame[] = gamesRes.response.games
      .filter((g) => g.playtime_forever > 0 && !featuredAppIds.includes(String(g.appid)))
      .sort((a, b) => b.playtime_forever - a.playtime_forever)
      .slice(0, 12)
      .map((g) => ({
        appId: g.appid,
        name: g.name,
        playtimeMinutes: g.playtime_forever,
        playtimeHours: Math.round((g.playtime_forever / 60) * 10) / 10,
        lastPlayed: g.rtime_last_played,
        recentPlaytime: recentPlaytimes.get(g.appid) ?? 0,
      }));

    const totalPlaytimeHours =
      Math.round(
        (gamesRes.response.games.reduce((sum, g) => sum + g.playtime_forever, 0) / 60) * 10
      ) / 10;

    return new Response(
      JSON.stringify({
        player: {
          name: player.personaname,
          avatar: player.avatarfull,
          profileUrl: player.profileurl,
        },
        totalGames: gamesRes.response.game_count,
        totalPlaytimeHours,
        games,
        featuredAppIds,
        fetchedAt: new Date().toISOString(),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
