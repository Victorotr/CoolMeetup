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
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
       
        <style>
            /* Estilos para hacer el correo electrónico responsive */
            @media screen and (max-width: 600px) {
                .container {
                    width: 100% !important;
                }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="padding: 20px 0; text-align: center;">
                    <h1 style="margin-bottom: 20px;">Cambio contraseña</h1>
                    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;"> Como solicitado, El código de recuperación es</p>
                    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">${recoverCode}</p>
                    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">  Si usted no ha solicitado el cambio, por favor ignore este email.
                    Puede hacer login con su contraseña habitual. Atentamente equipo de Coolmeetup.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
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
