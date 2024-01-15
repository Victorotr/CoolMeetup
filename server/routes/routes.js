import { Router } from 'express';
import { Ping } from '../controllers/cookies/Ping.js';
import { OnRefreshCookies } from '../controllers/cookies/OnRefreshCookies.js';
import { getAllMeetups } from '../controllers/meetups/getAllMeetups.js';
import { getSingleMeetupDetails } from '../controllers/meetups/getSingleMeetupDetails.js';
import { SignIn } from '../controllers/signin/signIn.js';
import { LogOut } from '../controllers/cookies/LogOut.js';
import { isLogged } from '../controllers/signin/isLogged.js';

const router = Router();

// Rutas de Meetups
router.get('/', getAllMeetups);

router.get('/islogged',isLogged);

router.get('/meetup/:id', getSingleMeetupDetails);


router.post('/signin',SignIn);

router.get('/logout',LogOut);
// router.post('/singUp/:meetupId', singUpForMeetup);


// router.post('/meetup', postMeetup);
// router.post('/singUp/:meetupId', singUpForMeetup);

// Rutas de Usuarios
// router.post('/user', registerUser);
// router.post('/login', loginUser);
/*
*Opcional: Ver el perfil de un usuario y los meetups a los que se ha
apuntado ordenados de más nuevo a más antiguo 
router.get('/user/:id', getUserInfo)

*Opcional: Gestión del perfil (nombre, biografía y avatar)
router.patch("/user", modifyUserInfo);
*/

// Rutas de cookies
router.get('/visit', OnRefreshCookies);

router.get('/ping', Ping);

router;

export default router;
