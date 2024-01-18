import express from 'express';
import morgan from 'morgan';
import router from './routes/routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());

app.use(express.json());

// Express cors
app.use(cors({
    origin:[process.env.CLIENT_URL,'http://localhost:5173'],
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
  console.error('app error catch',error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
 
});

// Lanzamos el servidor

app.listen(3000, () => {
  console.log('Servidor funcionado ✅ en puerto 3000');
});
