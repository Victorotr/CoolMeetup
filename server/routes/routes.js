import { Router } from 'express';
import { Ping } from '../controllers/Ping.js';
import { VisitCookie } from '../controllers/VisitCookie.js';

const router = Router();

// Rutas de Meetups
router.get('/', getAllMeetups);
router.get('/meetup/:id', getSingleMeetupDetails);
router.post('/singUp/:meetupId', singUpForMeetup);
router.post('/meetup', postMeetup);

// Rutas de Usuarios
router.post('/user', registerUser);
router.post('/login', loginUser);
/*
*Opcional: Ver el perfil de un usuario y los meetups a los que se ha
apuntado ordenados de más nuevo a más antiguo 
router.get('/user/:id', getUserInfo)

*Opcional: Gestión del perfil (nombre, biografía y avatar)
router.patch("/user", modifyUserInfo);
*/

// Rutas de cookies
router.get('/visit', VisitCookie);
router.get('/ping', Ping);

router;

export default router;
