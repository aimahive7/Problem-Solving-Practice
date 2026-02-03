// src/app.module.ts
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    ...databaseProviders,
    UserService,
  ],
})
export class AppModule {
  constructor() {
    // Setup graceful shutdown
    const pool = databaseProviders.find(p => p.provide === 'DATABASE_POOL');
    if (pool) {
      process.on('SIGINT', async () => {
        console.log('Received SIGINT, shutting down gracefully...');
        const dbPool = await pool.useFactory();
        await dbPool.end();
        process.exit(0);
      });
    }
  }
}