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
app.use(
  cors({
    origin: ['*'],
    credentials: true,
  })
);

// Middleware para aceptar cookies
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

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
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

// Lanzamos el servidor

app.listen(3000, () => {
  console.log('Servidor funcionado ✅');
});
