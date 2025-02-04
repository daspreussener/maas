const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'maas1234',
  database: 'postgres',
});

client.connect()
  .then(() => {
    console.log('Connected to the database successfully');
    return client.end();
  })
  .catch(err => {
    console.error('Connection error', err.stack);
  });