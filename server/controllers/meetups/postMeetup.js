// Functions requires ↓

//import { generateError } from '../../services/generateError.js';

// Querie require ↓

//import { postMeetupQuery } from '../../db/meetupQueries/postMeetupQuery.js';

// Joi require ↓ 

//import meetupJoi from '../../jois/meetupSchemas.cjs';
//const { newMeetupJoi } = meetupJoi;
// Controller ↓
import fs from 'fs'
import { getConnection } from '../../db/ConnectionDB.js';

export const postMeetup = async (req, res, next) => {
  const connection = await getConnection();
  try {
    console.log(req.file)
    const { user_id, title, description, category, address, meetupDate } = req.body
    if (!user_id || !title || !description || !category || !meetupDate) {
      console.log(req.body)

      res.status(403).send({ status: 'FAILED', message: 'Faltan datos obligatorios!' });
      return
    }
    console.log(meetupDate)
    const meetupObject = {
      id_main_user: user_id,
      title: title,
      description: description,
      category: category,
      date: new Date(meetupDate),
      image:  process.env.MEETUP_IMAGE_URL +req.file.originalname || null
    }
    try {

      const addressParse = JSON.parse(address);
      const addressString = addressParse.formatted_address;
      const location = addressParse.geometry.location;
      const addressComponents = addressParse.address_components

      // console.log(addressComponents,addressString,location);
      const countryObject = addressComponents.find(item => item.types.includes('country'));

      // Obtiene el valor de long_name si se encuentra, de lo contrario, usa un valor por defecto
      const countryName = countryObject ? countryObject.long_name : 'País no encontrado';
      // console.log('country',countryName) 

      const Object = addressComponents.find(item => item.types.includes('administrative_area_level_2'));

      // Obtiene el valor de long_name si se encuentra, de lo contrario, usa un valor por defecto
      const cityName = Object ? Object.long_name : 'País no encontrado';


      const addressProcessed = {
        city: cityName,
        coordenades: [location.lat, location.lng],
        direction: addressString,
        country: countryName
      }
      console.log(meetupObject)
      meetupObject.address = addressProcessed;
      console.log(meetupObject)
    } catch (error) {
      console.log(address);
      if(req.file && req.file.originalname){
        fs.unlinkSync(`./Controllers/users/meetup/${req.file.originalname}`)
      }
      res.status(403).send({ status: 'FAILED', message: 'Error al processar la ubicación' });
      return
    }
    const [insert_meetup]=await connection.query(`
    INSERT INTO meetups(id_main_user,meetup_title,meetup_description,meetup_country,meetup_town,x_cordinate,y_cordinate,meetup_datetime,meetup_theme,meetup_image) VALUES(?,?,?,?,?,?,?,?,?,?);`,[user_id,title,description,meetupObject.address.country,meetupObject.address.city,meetupObject.address.coordenades[0],meetupObject.address.coordenades[1],meetupObject.date,category,meetupObject.image])
    console.log(insert_meetup);
    if(insert_meetup.affectedRows>0){
      res.status(200).send({status:'OK',message:'Meetup publicado correctamente'});
      return
    }else{
      res.status(403).send({status:'FAILED',message:'error al guardar el meetup'});
      return
    } 
    
    // const {
    //   meetup_title,
    //   meetup_description,
    //   meetup_province,
    //   meetup_town,
    //   meetup_datetime,
    // } = req.body;

    // const { id } = req.userInfo;

    // // Joi validation
    // const schema = newMeetupJoi;
    // const validation = schema.validate(req.body);

    // if (validation.error) {
    //   throw generateError(validation.error.message, 401);
    // }

    // const meetupDatetime = new Date(meetup_datetime);
    // const date = new Date();

    // if (date.getTime() > meetupDatetime.getTime()) {
    //   throw generateError(
    //     'La fecha del meetup no puede ser anterior a hoy',
    //     401
    //   );
    // }

    // // Query: Create offer
    // const meetupId = await postMeetupQuery(
    //   id,
    //   meetup_title,
    //   meetup_description,
    //   meetup_province,
    //   meetup_town,
    //   meetup_datetime
    // );

    // // Res.send
    // res.status(201).send({
    //   status: 'ok',
    //   message: `Meetup con id (${meetupId}) creada con éxito`,
    //   data: {
    //     id: meetupId,
    //   },
    // });
   
  } catch (error) {
    res.status(403).send({ status: 'FAILED', message: 'Error al processar los datos ' })
    next(error);
  }
};
