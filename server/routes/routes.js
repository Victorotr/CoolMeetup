import { Router } from 'express';
import { Ping } from '../controllers/cookies/Ping.js';
//import { VisitCookie } from '../controllers/cookies/VisitCookie.js';
import registerUser from '../Controllers/users/registerUser.js';
import validateUser from '../Controllers/users/validateUser.js';
import { OnRefreshCookies } from '../controllers/cookies/OnRefreshCookies.js';
import { getAllMeetups } from '../controllers/meetups/getAllMeetups.js';
import { getSingleMeetupDetails } from '../controllers/meetups/getSingleMeetupDetails.js';
import { postMeetup } from '../controllers/meetups/postMeetup.js';
import { SignIn } from '../controllers/signin/signIn.js';
import { LogOut } from '../controllers/cookies/LogOut.js';
import { isLogged } from '../controllers/signin/isLogged.js';
import loginRegisterWithGoogle from '../Controllers/users/loginRegisterWithGoogle.js';
import { getUserDetails } from '../Controllers/users/getUserDetails.js';
import { savePhoto } from '../services/savePhoto.js';
import Upload from '../Middlewares/fileUpload.js';
import { isUser } from '../Middlewares/isUser.js';
import { getImg } from '../services/imgGet.js';
import { UpdateUserDetails } from '../Controllers/users/updateUserDetails.js';

const router = Router();

// Rutas de Meetups
router.get('/', getAllMeetups);
//router.get('/meetup/:id', getSingleMeetupDetails);
//router.post('/singUp/:meetupId', singUpForMeetup);
//router.post('/meetup', postMeetup);

// Rutas de Usuarios
router.post('/registerUser', registerUser);

router.post('/validateUser', validateUser);

router.post('/loginRegisterWithGoogle', loginRegisterWithGoogle);
//router.post('/login', loginUser);
router.get('/', getAllMeetups);

router.get('/meetup/:id', getSingleMeetupDetails);

router.post('/signin', SignIn);

router.get('/logout', LogOut);

router.post('/update/user', isUser, Upload, savePhoto, UpdateUserDetails);

router.get('/user/details/:id', getUserDetails);
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
router.get('/user/avatar/:id', getImg);
// Rutas de cookies
router.get('/visit', OnRefreshCookies);

router.get('/ping', Ping);

router;

export default router;
