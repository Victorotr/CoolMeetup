import express from 'express';
import morgan from 'morgan';
import router from './routes/routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { deleteOldMeetups } from './Controllers/meetups/deleteOldMeetups.js';
const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());

// Express cors
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      'http://localhost:5173',
      'http://192.168.1.65:5173',
    ],

    credentials: true,
  })
);

// Rutas
app.use(router);

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error('app error catch', error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  }); 
  
});   

const interval = setInterval(() => {
  deleteOldMeetups() 
}, process.env.AUTO_DELETE_TIME);  
if(process.env.AUTO_DELETE  === 'false'){
  clearInterval(interval)
}

// Lanzamos el servidor

app.listen(3000, () => {
  console.log('Servidor funcionado ✅ en puerto 3000');
});
