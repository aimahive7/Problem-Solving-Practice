// src/user/user.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findAll() {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM users');
      return result.rows;
    } finally {
      client.release(); // Always release the client back to the pool
    }
  }

  async findOne(id: number) {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async create(userData: any) {
    const client = await this.pool.connect();
    try {
      const { username, email, phone } = userData;
      const result = await client.query(
        'INSERT INTO users (username, email, phone, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
        [username, email, phone]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async update(id: number, userData: any) {
    const client = await this.pool.connect();
    try {
      const { username, email, phone } = userData;
      const result = await client.query(
        'UPDATE users SET username = $1, email = $2, phone = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
        [username, email, phone, id]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async remove(id: number) {
    const client = await this.pool.connect();
    try {
      const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}