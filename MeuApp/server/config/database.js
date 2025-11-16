const { Sequelize } = require('sequelize');
require('dotenv').config();

// Read database credentials strictly from environment variables (no hardcoded defaults)
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;

if (!DB_NAME || !DB_USER) {
  console.warn('Warning: DB_NAME or DB_USER not set in environment. Set these in server/.env');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
