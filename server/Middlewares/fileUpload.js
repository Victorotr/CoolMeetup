import multer from 'multer';
import path from 'path';

//import { v4 as uuidv4 } from 'uuid';
 // destination: 
  //   filename: (req, file, cb) => {
  //     cb(null, uuidv4() + path.extname(file.originalname));
  //   },

const storage = multer.memoryStorage()

const Upload = multer({
  storage: storage,
  
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
   
    return cb(new Error({message:'not allowed file extention'}));
  },
}).single('avatar');

export default  Upload;
