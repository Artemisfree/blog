import { defineConfig } from '@mikro-orm/postgresql';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

const mikroOrmConfig: MikroOrmModuleSyncOptions = defineConfig({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'blog_db',
  host: 'localhost',
  port: 50432,
  user: 'blog',
  password: 'blog123',
  debug: true,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
});

export default mikroOrmConfig;
