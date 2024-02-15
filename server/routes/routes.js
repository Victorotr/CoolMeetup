import { Router } from 'express';
import { Ping } from '../Controllers/cookies/Ping.js';
import registerUser from '../Controllers/users/registerUser.js';
import validateUser from '../Controllers/users/validateUser.js';
import { OnRefreshCookies } from '../Controllers/cookies/OnRefreshCookies.js';
import { getAllMeetups } from '../Controllers/meetups/getAllMeetups.js';
import { getSingleMeetupDetails } from '../Controllers/meetups/getSingleMeetupDetails.js';
import { postMeetup } from '../Controllers/meetups/postMeetup.js';
import { signUpMeetup } from '../Controllers/meetups/signUpMeetup.js';
import { SignIn } from '../Controllers/signin/signIn.js';
import { LogOut } from '../Controllers/cookies/LogOut.js';
import { isLogged } from '../Controllers/signin/isLogged.js';
import { isUser } from '../Middlewares/isUser.js';
import loginRegisterWithGoogle from '../Controllers/users/loginRegisterWithGoogle.js';
import { getUserDetails } from '../Controllers/users/getUserDetails.js';
import { savePhoto } from '../services/savePhoto.js';
import Upload from '../Middlewares/fileUpload.js';
import { getImg } from '../services/imgGet.js';
import { UpdateUserDetails } from '../Controllers/users/updateUserDetails.js';
import { saveMeetupPhoto } from '../services/saveMeetupPhoto.js';
import { getMeetupImg } from '../services/meetupImgGet.js';
import { recoverPassword } from '../Controllers/users/recoverPassword.js';
import { resetPassword } from '../Controllers/users/resetPassword.js';
import { getUserMeetups } from '../Controllers/meetups/getUserMeetups.js';
import { getUserMeetupsAttendees } from '../Controllers/meetups/getUserMeetupsAttendees.js';
import { cancelMeetup } from '../Controllers/meetups/cancelMeetup.js';


const router = Router();

// Rutas de Meetups

router.get('/', getAllMeetups);

router.get('/meetup/:id',isUser, getSingleMeetupDetails);

router.post('/meetup', isUser, postMeetup);

router.post('/singUp/:meetupId', isUser, signUpMeetup);

router.post('/registerUser', registerUser);

router.get('/islogged', isLogged);

router.post('/validateUser', validateUser);

router.post('/loginRegisterWithGoogle', loginRegisterWithGoogle);

router.post('/getMeetups', getAllMeetups);

router.get('/islogged', isLogged);

router.post('/signin', SignIn);

router.get('/logout', LogOut);

router.post('/update/user', isUser, Upload, savePhoto, UpdateUserDetails);

router.get('/user/details/:id', getUserDetails);

router.get('/user/meetups/:id',isUser, getUserMeetups);

router.get('/user/meetupsAttendees/:id',isUser,getUserMeetupsAttendees);

router.post('/create/meetup', isUser, Upload, saveMeetupPhoto, postMeetup);

router.get('/signUp/:meetupId',isUser, signUpMeetup);

router.post('/cancel/meetup',isUser,cancelMeetup)

router.get('/getImage/:id/:fileType', getImg);

router.get('/user/avatar/:id', getImg);

router.get('/meetup/image/:id', getMeetupImg);

router.post('/recoverpwd', recoverPassword);

router.post('/resetpwd', resetPassword);

router.get('/visit', OnRefreshCookies);

router.get('/ping', Ping);

router;

export default router;
