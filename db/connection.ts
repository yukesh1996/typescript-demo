import { Client } from 'pg';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import Logger from "../config/logger/Logger";
const env = process.env.NODE_ENV || 'development';

import config from '../config/db';

const db = config[env as keyof typeof config];

export async function initializeDb() {
  try {
    // try connecting to default db
    const client = new Client({ ...db, database: 'postgres' });
    await client.connect();
    const rs = await client.query(`select exists (select 1 from pg_database where datname = $1) as db_exists`, [db.database]);

    if (!rs || !rs.rows.length || !rs.rows[0].db_exists) {
      Logger.info(`Creating database ${db.database}`);
      await client.query(`create database ${db.database};`);
    } else {
      Logger.info(`Database ${db.database} exists`);
    }
  } catch (err) {
    Logger.error('Error creating db: ', err);
  }
}

export default new Sequelize(db.database!, db.username!, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect! as Dialect,
  logging: false,
  pool: db.pool,
})
