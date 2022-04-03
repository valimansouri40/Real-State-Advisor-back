const express= require('express');
const Auth= require('../Controllers/AuthControllers');
const router= express.Router();


router.route('/sineup').post(Auth.Sineup);
router.route('/login').post(Auth.Login);
router.route('/forgetPassword').post(Auth.ForgetPassword);
router.route('/resetpassword').post(Auth.ResetPassword);
router.route('/sendsmscode').post(Auth.SendSmSPass);
router.route('/recivesmscode').post(Auth.ReciveSMS);
router.route('/sendreq').post(Auth.RequestJobHandller);

router.route('/gh').get(Auth.Protected,Auth.GetMeData);

router.use(Auth.Protected);

router.route('/changepassword').post(Auth.ChangePassword)
router.route('/updateprofile/:id').patch(Auth.UpdateProfile);

router.use(Auth.ResterictTo('admin', 'employee','advisor'));

router.route('/changerole/:id').get(Auth.GetOneUser).patch(Auth.UpdateDataWithField);

module.exports= router;
