// Example PostgreSQL connection in Node.js using 'pg' package
const { Client } = require('pg');

const client = new Client({
  host: 'db',
  port: 5432,
  user: 'farmersmk',
  password: 'farmersmkpass',
  database: 'farmersmkdb',
});

client.connect()
  .then(() => console.log('Connected to the database!'))
  .catch(err => console.error('Connection error', err.stack))
  .finally(() => client.end());
