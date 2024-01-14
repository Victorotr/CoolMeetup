import { Router } from 'express';
<<<<<<< HEAD
import { Ping } from '../controllers/Ping.js';
import { VisitCookie } from '../controllers/VisitCookie.js';
import { getMeetups } from '../Controllers/meetups/getMeetups.js';
import registerUser from '../Controllers/users/registerUser.js';
import validateUser from '../Controllers/users/validateUser.js';

=======
import { Ping } from '../controllers/cookies/Ping.js';
import { OnRefreshCookies } from '../controllers/cookies/OnRefreshCookies.js';
import { getAllMeetups } from '../controllers/meetups/getAllMeetups.js';
import { getSingleMeetupDetails } from '../controllers/meetups/getSingleMeetupDetails.js';
<<<<<<< HEAD
>>>>>>> origin/main
=======
import { SignIn } from '../controllers/signin/signIn.js';
import { LogOut } from '../controllers/cookies/LogOut.js';
>>>>>>> origin/Matteos-branch

const router = Router();

// Rutas de Meetups
<<<<<<< HEAD
router.get('/', getMeetups);
//router.get('/meetup/:id', getSingleMeetupDetails);
//router.post('/singUp/:meetupId', singUpForMeetup);
//router.post('/meetup', postMeetup);

// Rutas de Usuarios
router.post('/registerUser', registerUser);
router.post('/validateUser',validateUser);
//router.post('/login', loginUser);
=======
router.get('/', getAllMeetups);

router.get('/meetup/:id', getSingleMeetupDetails);

router.post('/signin',SignIn);

router.get('/logout',LogOut);
// router.post('/singUp/:meetupId', singUpForMeetup);
// router.post('/meetup', postMeetup);

// Rutas de Usuarios
// router.post('/user', registerUser);
// router.post('/login', loginUser);
>>>>>>> origin/main
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
