import { generateError } from '../../services/generateError.js';
import meetupJoi from '../../jois/meetupSchemas.cjs';
const { newMeetupJoi } = meetupJoi;
// Controller ↓
import fs from 'fs';
import { getConnection } from '../../db/ConnectionDB.js';

export const postMeetup = async (req, res, next) => {
  const connection = await getConnection();
  try {
   
    const { user_id, title, description, category, address, meetupDate } =
      req.body;
    if (!user_id || !title || !description || !category || !meetupDate) {
      console.log(req.body);
    }
    const id = req.isUser;

    // Joi validation
    const schema = newMeetupJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }
    const meetupObject = {
      id_main_user: user_id,
      title: title,
      description: description,
      category: category,
      date: new Date(meetupDate),
      image: req.file
        ? process.env.IMAGE_URL + req.file.originalname + '/Meetup'
        : null,
      image_id : req.file? req.file.originalname : null
    };
    try {
      const addressParse = JSON.parse(address);
      const addressString = addressParse.formatted_address;
      const location = addressParse.geometry.location;
      const addressComponents = addressParse.address_components;
    
      const countryObject = addressComponents.find((item) =>
        item.types.includes('country')
      );
      const countryName = countryObject
        ? countryObject.long_name
        : 'País no encontrado';
      const Object = addressComponents.find((item) =>
        item.types.includes('administrative_area_level_2')
      ) || addressComponents.find((item) =>
      item.types.includes('administrative_area_level_1')
    )

      const cityName = Object ? Object.long_name : 'Indefinido';

      const addressProcessed = {
        city: cityName,
        coordenades: [location.lat, location.lng],
        direction: addressString,
        country: countryName,
      };

      meetupObject.address = addressProcessed;
    
    } catch (error) {
   
      if (req.file && req.file.originalname) {
        fs.unlinkSync(`./Controllers/users/meetup/${req.file.originalname}`);
      }
      res
        .status(403)
        .send({ status: 'FAILED', message: 'Error al processar la ubicación' });
      return;
    }
    const [insert_meetup] = await connection.query(
      `
    INSERT INTO meetups(id_main_user,meetup_title,meetup_description,meetup_address,meetup_country,meetup_town,x_cordinate,y_cordinate,meetup_datetime,meetup_theme,meetup_image,meetup_image_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);`,
      [
        id,
        title,
        description,
        meetupObject.address.direction,
        meetupObject.address.country,
        meetupObject.address.city,
        meetupObject.address.coordenades[0],
        meetupObject.address.coordenades[1],
        meetupObject.date,
        category,
        meetupObject.image,
        meetupObject.image_id
      ]
    );
    console.log(insert_meetup);
    if (insert_meetup.affectedRows > 0) {
      res
        .status(200)
        .send({
          status: 'OK',
          message: 'Meetup publicado correctamente',
          meetupId: insert_meetup.insertId,
        });
      return;
    } else {
      res
        .status(403)
        .send({ status: 'FAILED', message: 'error al guardar el meetup' });
      return;
    }
  } catch (error) {
    console.log(error);
    try {
      fs.unlinkSync(`./Controllers/users/meetup/${req.file.originalname}`);
    } catch (error) {
      console.log(error)
    }
      res.status(403).send({ status: 'FAILED', message: 'Algo ha ido mal' });
  }finally{
    if(connection){connection.release()}
  }
};
