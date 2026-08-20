// ============================================================
//  fetch-steam.ts — 构建时从 Steam Web API 拉取游戏库数据
//  运行: npx tsx scripts/fetch-steam.ts
//  输出: src/data/steam-games.json
// ============================================================

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

// ── 加载 .env ──────────────────────────────────────────────
function loadEnv(): void {
  // .env 已被 gitignore；本地从文件读取，CI/Vercel 上由平台注入环境变量
  const envPath = resolve(import.meta.dirname, "..", ".env");
  let content: string;
  try {
    content = readFileSync(envPath, "utf-8");
  } catch {
    return;
  }
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

interface SteamOwnedGame {
  appid: number;
  name: string;
  playtime_forever: number;
  playtime_2weeks?: number;
  img_icon_url: string;
  rtime_last_played: number;
}

interface SteamRecentGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
}

interface SteamPlayer {
  personaname: string;
  avatarfull: string;
  profileurl: string;
}

interface OutputGame {
  appId: number;
  name: string;
  playtimeMinutes: number;
  playtimeHours: number;
  lastPlayed: number;
  recentPlaytime: number;
}

interface Output {
  player: {
    name: string;
    avatar: string;
    profileUrl: string;
  };
  totalGames: number;
  totalPlaytimeHours: number;
  games: OutputGame[];
  featuredAppIds: string[];
  fetchedAt: string;
}

function fetchSteam<T>(path: string, params: Record<string, string>): T {
  const url = new URL(path, "https://api.steampowered.com");
  url.searchParams.set("key", process.env.STEAM_API_KEY!);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const stdout = execSync(`curl -s --max-time 30 "${url.toString().replace(/"/g, '\\"')}"`, {
    encoding: "utf-8",
    maxBuffer: 10 * 1024 * 1024,
  });
  return JSON.parse(stdout) as T;
}

function main() {
  loadEnv();

  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    console.warn(
      "Missing STEAM_API_KEY or STEAM_ID — skipping fetch, keeping committed src/data/steam-games.json"
    );
    process.exit(0);
  }

  console.log("Fetching Steam data...");

  // 1. 玩家信息
  const playerRes = fetchSteam<{
    response: { players: SteamPlayer[] };
  }>("/ISteamUser/GetPlayerSummaries/v2/", { steamids: steamId });

  const player = playerRes.response.players[0];
  console.log(`  Player: ${player.personaname}`);

  // 2. 游戏库
  const gamesRes = fetchSteam<{
    response: { game_count: number; games: SteamOwnedGame[] };
  }>("/IPlayerService/GetOwnedGames/v1/", {
    steamid: steamId,
    include_appinfo: "true",
    include_played_free_games: "true",
  });

  const allGames = gamesRes.response.games;
  console.log(`  Owned: ${gamesRes.response.game_count} games`);

  // 3. 最近游玩
  const recentPlaytimes = new Map<number, number>();
  try {
    const recentRes = fetchSteam<{
      response: { games: SteamRecentGame[] };
    }>("/IPlayerService/GetRecentlyPlayedGames/v1/", {
      steamid: steamId,
      count: "100",
    });
    for (const g of recentRes.response.games) {
      recentPlaytimes.set(g.appid, g.playtime_2weeks);
    }
    console.log(`  Recent: ${recentRes.response.games.length} games`);
  } catch {
    console.log("  Recent: skipped (profile may be private)");
  }

  // ── 精选游戏 ID，不在库列表中重复出现 ──
  const featuredAppIds = ["1245620", "271590", "1687950", "1086940"];

  // ── 处理：过滤零时长、排序、取前 12 款 ──
  const processed: OutputGame[] = allGames
    .filter((g) => g.playtime_forever > 0)
    .filter((g) => !featuredAppIds.includes(String(g.appid)))
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
      (allGames.reduce((sum, g) => sum + g.playtime_forever, 0) / 60) * 10
    ) / 10;

  const output: Output = {
    player: {
      name: player.personaname,
      avatar: player.avatarfull,
      profileUrl: player.profileurl,
    },
    totalGames: gamesRes.response.game_count,
    totalPlaytimeHours,
    games: processed,
    featuredAppIds,
    fetchedAt: new Date().toISOString(),
  };

  const outPath = resolve(import.meta.dirname, "..", "src", "data", "steam-games.json");
  writeFileSync(outPath, JSON.stringify(output, null, 2), "utf-8");
  console.log(`\nDone! ${processed.length} games written to src/data/steam-games.json`);
  console.log(`Total playtime: ${totalPlaytimeHours} hours across ${gamesRes.response.game_count} games`);
}

main();
