// Npm require↓

import { v4 as uuidv4 } from 'uuid';

// Functions requires ↓

import { generateError } from '../../services/generateError.js';
import { getConnection } from '../ConnectionDB.js';
import sendMail from '../../services/sendMail.js';

// Query ↓

export const recoverPwdQuery = async (email) => {
  let connection;
  try {
    connection = await getConnection();

    // Check email in the database
    const [currentMail] = await connection.query(
      `
          SELECT id_user
          FROM users
          WHERE user_email = ?
          `,
      [email]
    );

    if (currentMail.length === 0)
      throw generateError(
        'No hay ningún usuario registrado con ese email',
        404
      );

    // Create confirmation email

    // Generate recoverCode
    const recoverCode = uuidv4();

    // Write bodyMail
    const bodyMail = `
          Se ha solicitado un cambio de contraseña en Coolmeetup para este email.
          El código de recuperación es: ${recoverCode}

          Si usted no ha solicitado el cambio, por favor ignore este email.
          Puede hacer login con su contraseña habitual.

          Atentamente equipo de Coolmeetup.
          `;

    // Call function sendMail
    await sendMail(
      email,
      'Solicitud de cambio de contraseña en Coolmeetup',
      bodyMail
    );

    // Set recovercode in database
    await connection.query(
      `
          UPDATE users
          SET recoverCode = ?, updated_at = ?
          WHERE user_email = ?
        `,
      [recoverCode, new Date(), email]
    );
  } finally {
    if (connection) connection.release();
  }
};
