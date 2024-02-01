// Functions requires ↓

import { generateError } from '../../services/generateError.js';

// Querie require ↓

import { recoverPasswordQuery } from '../../db/userQueries/recoverPasswordQuery.js';

// Joi require ↓

const { recoverPasswordJoi } = require('../../jois/userSchemas.js');

// Controller ↓

export const recoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Joi validation
    const schema = recoverPasswordJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 400);
    }

    // Query: create recoverCode
    await recoverPasswordQuery(email);

    res.status(200).send({
      status: 'ok',
      message: 'Se ha solicitado su cambio de contraseña',
    });
  } catch (error) {
    next(error);
  }
};
