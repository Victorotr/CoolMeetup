import { Router } from 'express';
import { Ping } from '../controllers/Ping.js';
import { VisitCookie } from '../controllers/VisitCookie.js';

const router = Router();

// Rutas de Meetups
router.get('/', getAllMeetups);
router.get('/meetup/:id', getSingleMeetupDetails);
router.post('/singUp/:meetupId', singUpForMeetup);

// Rutas de Usuarios
router.post('/user', registerUser);
router.post('/login', loginUser);

router.get('/visit', VisitCookie);
router.get('/ping', Ping);

router;

export default router;
