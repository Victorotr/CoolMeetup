import { Router } from 'express';
import { Ping } from '../controllers/cookies/Ping.js';
//import { VisitCookie } from '../controllers/cookies/VisitCookie.js';
import registerUser from '../Controllers/users/registerUser.js';
import validateUser from '../Controllers/users/validateUser.js';
import { OnRefreshCookies } from '../controllers/cookies/OnRefreshCookies.js';
import { getAllMeetups } from '../Controllers/meetups/getAllMeetups.js';
import { getSingleMeetupDetails } from '../controllers/meetups/getSingleMeetupDetails.js';
import { postMeetup } from '../controllers/meetups/postMeetup.js';
import { signUpMeetup } from '../controllers/meetups/signUpMeetup.js';
import { SignIn } from '../controllers/signin/signIn.js';
import { LogOut } from '../controllers/cookies/LogOut.js';
import { isLogged } from '../controllers/signin/isLogged.js';
import { isUser } from '../Middlewares/isUser.js';
import loginRegisterWithGoogle from '../Controllers/users/loginRegisterWithGoogle.js';
import { getUserDetails } from '../Controllers/users/getUserDetails.js';
import { savePhoto } from '../services/savePhoto.js';
import Upload from '../Middlewares/fileUpload.js';
import { getImg } from '../services/imgGet.js';
import { UpdateUserDetails } from '../Controllers/users/updateUserDetails.js';
import { saveMeetupPhoto } from '../services/saveMeetupPhoto.js';
import { getMeetupImg } from '../services/meetupImgGet.js';
import { recoverPassword } from '../controllers/users/recoverPassword.js';
import { resetPassword } from '../controllers/users/resetPassword.js';
import { getUserMeetups } from '../Controllers/meetups/getUserMeetups.js';
import { getUserMeetupsAttendees } from '../Controllers/meetups/getUserMeetupsAttendees.js';
import { cancelMeetup } from '../Controllers/meetups/cancelMeetup.js';


const router = Router();

// Rutas de Meetups

router.get('/', getAllMeetups);

router.get('/meetup/:id', getSingleMeetupDetails);

router.post('/meetup', isUser, postMeetup);

router.post('/singUp/:meetupId', isUser, signUpMeetup);

// Rutas de Usuarios
router.post('/registerUser', registerUser);

router.get('/islogged', isLogged);

router.post('/validateUser', validateUser);

router.post('/loginRegisterWithGoogle', loginRegisterWithGoogle);

router.post('/getMeetups', getAllMeetups);

router.get('/islogged', isLogged);

router.get('/meetup/:id', getSingleMeetupDetails);

router.post('/signin', SignIn);

router.get('/logout', LogOut);

router.post('/update/user', isUser, Upload, savePhoto, UpdateUserDetails);

router.get('/user/details/:id', getUserDetails);


router.get('/user/meetups/:id',isUser, getUserMeetups);

router.get('/user/meetupsAttendees/:id',getUserMeetupsAttendees);

router.post('/create/meetup', isUser, Upload, saveMeetupPhoto, postMeetup);

router.get('/signUp/:meetupId',isUser, signUpMeetup);

router.post('/cancel/meetup',isUser,cancelMeetup)
// Rutas de Usuarios
// router.post('/user', registerUser);
// router.post('/login', loginUser);
//Opcional: Ver el perfil de un usuario y los meetups a los que se ha
//apuntado ordenados de más nuevo a más antiguo 
//router.get('/user/:id', getUserInfo)

router.get('/getImage/:id/:fileType', getImg);

router.get('/user/avatar/:id', getImg);

router.get('/meetup/image/:id', getMeetupImg);

router.post('/recoverpwd', recoverPassword);

router.post('/resetpwd', resetPassword);

// Rutas de cookies
router.get('/visit', OnRefreshCookies);

router.get('/ping', Ping);

router;

export default router;
