const sharp = require("sharp");
const path = require("path");
const fs = require("fs/promises");
const uuid = require("uuid");

const savePhoto = async (dataPhoto) => {
  // creo la imagen con sharp a partir del buffer
  const img = sharp(dataPhoto.data);

  // genero un nombre unico para la image
  const photoNameUniq = `${uuid.v4()}_${dataPhoto.name}`;

  // guardo la imagen en el directorio de los ficheros estaticos
  console.log(__dirname);
  await img.toFile(
    path.join(__dirname, process.env.UPLOADS_DIRECTORY, photoNameUniq)
  );

  return photoNameUniq;
};

module.exports = savePhoto;
