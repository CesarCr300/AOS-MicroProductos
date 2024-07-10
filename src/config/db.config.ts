import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { env } from 'process';

export const dbConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => {
    return {
      type: 'mysql',
      host: env.DATABASE_HOST,
      port: Number.parseInt(env.DATABASE_PORT),
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      entities: [],
      autoLoadEntities: true,
      ssl:
        env.TIDB_ENABLE_SSL === 'true'
          ? {
              minVersion: 'TLSv1.2',
              ca: env.TIDB_CA_PATH ? readFileSync(env.TIDB_CA_PATH) : null,
            }
          : null,
    };
  },
};
