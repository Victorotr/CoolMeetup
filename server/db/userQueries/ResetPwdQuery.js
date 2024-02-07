// Npm requires ↓

import bcrypt from 'bcrypt';

// Functions requires ↓

import { generateError } from '../../services/generateError.js';
import { getConnection } from '../ConnectionDB.js';

// Query ↓

export const resetPasswordQuery = async (recoverCode, newPassword) => {
  let connection;
  try {
    connection = await getConnection();

    // Check if recoverCode is correct
    const [user] = await connection.query(
      `
          SELECT *
          FROM users
          WHERE recoverCode = ?
        `,
      [recoverCode]
    );

    if (user.length === 0) {
      throw generateError('Código de recuperación incorrecto', 401);
    }

    if (user.user === newPassword) {
      throw generateError(
        'La contraseña no puede coincidir con el nombre de usuario',
        401
      );
    }

    // Crypt newPassword
    const newPasswordHash = await bcrypt.hash(newPassword, 8);

    // Update password
    await connection.query(
      `
          UPDATE users
          SET user_password = ?, updated_at = ?, recoverCode = NULL
          WHERE id_user = ?
        `,
      [newPasswordHash, new Date(), user[0].id_user]
    );
  } finally {
    if (connection) connection.release();
  }
};
