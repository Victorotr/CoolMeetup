// Archivo para ejecutar la base de datos en local

require('dotenv').config();

import getConnection from './ConnectionDB';

async function createDB() {
  let connection;

  try {
    connection = await getConnection();

    await connection.query();
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

createDB();
