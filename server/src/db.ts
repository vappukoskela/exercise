import { env } from '@server/env';
import { logger } from '@server/logging';
import { Pool, PoolConfig } from 'pg';
import { DatabasePool, createPool, stringifyDsn } from 'slonik';

// * fastify session plugin requires a 'pg' connection pool
// * slonik pool can be created with custom class.
// In order to use one and only one connection pool we need access the
// underlying pg pool instance that can be passed to fastify session plugin.
export class SharedPool extends Pool {
  private static pool: Pool;
  constructor(config: PoolConfig) {
    super(config);
    SharedPool.pool = this;
  }
  static getPool() {
    return SharedPool.pool;
  }
}


const buildConnectionDsn = (): string => {
  return (
    stringifyDsn({
      databaseName: env.db.database,
      host: env.db.host,
      port: env.db.port,
      username: env.db.username,
      password: env.db.password,
    }) + `?sslmode=${env.db.sslMode}`
  );
};

const connectionDsn = buildConnectionDsn();

let pool: DatabasePool | null = null;

export async function createDatabasePool() {
  const uriEncodedPassword = encodeURIComponent(env.db.password ?? '');
  const redactedDsn = connectionDsn.replace(uriEncodedPassword, '********');
  logger.info(`Connecting to ${redactedDsn}`);
  pool = await createPool(connectionDsn, {
    PgPool: SharedPool,
  });
}

export function getPool() {
  if (pool) {
    return pool;
  } else {
    throw Error('DB pool is not initialized');
  }
}