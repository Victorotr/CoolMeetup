// Functions requires ↓

import { generateError } from '../../services/generateError.js';

// Query require ↓

import { resetPasswordQuery } from '../../db/userQueries/resetPasswordQuery.js';

// Joi require ↓

import { resetPasswordJoi } from '../../jois/userSchemas.js';

// Controller ↓

export const resetPassword = async (req, res, next) => {
  try {
    const { recoverCode, newPassword } = req.body;

    // Joi validation
    const schema = resetPasswordJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    //Query: swithPassword
    await resetPasswordQuery(recoverCode, newPassword);

    res.status(201).send({
      status: 'ok',
      message: 'Se ha reestablecido la contraseña correctamente',
    });
  } catch (error) {
    next(error);
  }
};
