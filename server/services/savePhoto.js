import sharp from 'sharp';
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

export const savePhoto = async (req, res, next) => {
  try {
    console.log('peticion savefoto')
   

    if (!req.file) {
      return next()
    }
    try {
      const randomId = uuidv4();
      const avatar = req.file
      avatar.originalname = randomId + '.webp'
     
      const processedImage = sharp(avatar.buffer)
      
      const resizedImage = processedImage.resize(300, 300);
      
      const resizedImageBuffer = await resizedImage.toBuffer();

      fs.writeFileSync(`./Controllers/users/avatars/${avatar.originalname}`,resizedImageBuffer);
      next();
    } catch (error) {
      console.log(error) 
      throw new Error('Error al procesar la imagen')
    } 

   
  } catch (err) {
    console.error('Error al procesar la imagen:', err);
    throw new Error('Error al procesar la imagen')
  }
};
