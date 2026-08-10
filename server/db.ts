import { Pool, type QueryResultRow } from "pg";

/**
 * Shared Postgres connection pool (client's roiclients Postgres).
 * Server-only — never import this into the Vite/React bundle.
 * Reads DATABASE_URL from the environment (.env, git-ignored).
 */
const globalForPg = globalThis as unknown as { _pgPool?: Pool };

function getPool(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForPg._pgPool) {
    globalForPg._pgPool = new Pool({
      connectionString: url,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      // Server has SSL disabled; keep it off. (Enable when the host supports TLS.)
    });
  }
  return globalForPg._pgPool;
}

/** Whether a database connection is configured. */
export function hasDb(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Run a parameterised query. Returns rows, or null if no DB is configured or the
 * query fails — callers fall back to the offline extracted catalogue so the site
 * never hard-crashes on a DB hiccup.
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<T[] | null> {
  const pool = getPool();
  if (!pool) return null;
  try {
    const result = await pool.query<T>(text, params);
    return result.rows;
  } catch (err) {
    console.error("[db] query failed:", (err as Error).message);
    return null;
  }
}
