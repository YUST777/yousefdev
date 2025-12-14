import fs from 'fs'
import path from 'path'

export type CachedProfilePayload = {
  success: boolean
  gifts: any[]
  profile: any
  total: number
  nftCount: number
  totalValue: number
  fetchedAt: number
  decorationColors?: any; // Colors from get_profile_gifts.py or get_user_profile.py
}

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DATA_DIR, 'profile_cache.db')

// Check if we are running in a Vercel environment
// Vercel sets 'VERCEL' environment variable to '1'
const IS_VERCEL = process.env.VERCEL === '1';

let db: any = null;
let getStmt: any = null;
let upsertStmt: any = null;

if (!IS_VERCEL) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Database = require('better-sqlite3');
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.prepare(`
      CREATE TABLE IF NOT EXISTS profile_cache (
        profile TEXT PRIMARY KEY,
        payload TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `).run()

    getStmt = db.prepare(`SELECT payload, updated_at FROM profile_cache WHERE profile = ?`)
    upsertStmt = db.prepare(`
      INSERT INTO profile_cache (profile, payload, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(profile) DO UPDATE SET
        payload = excluded.payload,
        updated_at = excluded.updated_at
    `)
  } catch (err) {
    console.error("Failed to initialize SQLite cache:", err);
    // Fallback if local init fails
    db = null;
  }
}

type CacheRow = {
  payload: string
  updated_at: number
}

export function getCachedProfile(profile: string) {
  if (IS_VERCEL || !db || !getStmt) return null;

  try {
    const row = getStmt.get(profile) as CacheRow | undefined
    if (!row) return null

    return {
      payload: JSON.parse(row.payload) as CachedProfilePayload,
      updatedAt: row.updated_at as number
    }
  } catch (e) {
    console.error("Error reading from cache:", e);
    return null;
  }
}

export function setCachedProfile(profile: string, payload: CachedProfilePayload) {
  const updatedAt = Date.now()

  if (IS_VERCEL || !db || !upsertStmt) {
    // In Vercel or if DB failed, just return current time (no caching)
    return updatedAt;
  }

  try {
    upsertStmt.run(profile, JSON.stringify(payload), updatedAt)
  } catch (e) {
    console.error("Error writing to cache:", e);
  }
  return updatedAt
}


