// Archivo para ejecutar la base de datos en local o resetearla

// Require npm ↓

require('dotenv').config();

// Import ↓

import getConnection from './connectionDB';

async function resetDB() {
  let connection;

  try {
    connection = await getConnection();

    await connection.query();
    // Implementar aqui las queries que queramos hacer desde el código
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

resetDB();
