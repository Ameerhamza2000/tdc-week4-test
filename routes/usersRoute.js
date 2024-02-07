const express =require('express');
const { userLogin, userSignup } =require('../controllers/usersController');
// validation middleware
const {loginValidation,signupValidation} =require('../middlewares/inputValidation');
const router= express.Router();

router.post('/signup',signupValidation,userSignup);

router.post('/login',loginValidation,userLogin);

module.exports= router;