// src/database/database.providers.ts
import { Provider } from '@nestjs/common';
import { Pool } from 'pg';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_POOL',
    useFactory: async () => {
      const pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'postgres',
        max: 20, // Maximum number of clients in the pool
        idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
        connectionTimeoutMillis: 2000, // How long to wait when connecting a new client
      });

      // Test the connection
      try {
        const client = await pool.connect();
        await client.query('SELECT NOW()');
        client.release();
        console.log('Database connection successful');
      } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
      }

      return pool;
    },
  },
];

// Graceful shutdown handler
export const handleShutdown = async (pool: Pool) => {
  console.log('Closing database connections...');
  await pool.end();
  console.log('Database connections closed');
  process.exit(0);
};

// Setup graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
});