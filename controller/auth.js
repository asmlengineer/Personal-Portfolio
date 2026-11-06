const bcrypt = require('bcryptjs');
const User = require('../Models/user');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

exports.getlogin = (req, res, next) => {
    res.render('Login', {
        isLoggedIn: false,
        errors: [],
        oldInput: { email: '', password: '' }
    });
};

exports.postlogout = (req, res, next) => {
    req.session.isLoggedIn = false;
    res.redirect('/login');
};

exports.getsignup = (req, res, next) => {
    res.render('Signup', {
        isLoggedIn: false,
        errors: [],
        oldInput: { name: '', email: '', username: ''} 
    });
};

exports.postsignup = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('First name is required')
        .matches(/^[A-Za-z]+$/)
        .withMessage('First name must contain only letters'),

    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),

    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
        .matches(/^[A-Za-z0-9]+$/)
        .withMessage('Username must contain only letters and numbers'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password must contain at least one uppercase letter, one number, and one special character'),

    check('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
          (req, res, next) =>{ 
        const { name, email, username, password, confirmPassword } = req.body;
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).render('Signup', {
              isLoggedIn: false,
              errors: errors.array(),
              oldInput: { name, email, username, password, confirmPassword }
        });
     }
     bcrypt.hash(password, 12)
     .then(hashedPassword =>{
        const user = new User({
            name: name,
            email: email,   
            username: username,
            password: hashedPassword});
        return user.save(); 
     }).then(() =>{
        res.redirect("/login");
     })
     .catch((err) =>{
        return res.status(422).render("Signup" ,{
            isLoggedIn: false,
            error: [err.message],
            oldInput: { name, email, username, password, confirmPassword }
        });
      });       
    }  
];   

exports.postlogin = async (req, res, next) => {
  const {email, password} = req.body;
   const user = await User.findOne({email});
    if(!user){
       return res.status(422).render('Login', {
        isLoggedIn: false,
        errors: [{'msg': 'Invalid email or password'}],
        oldInput: { email}
       }); 
    }  
    req.session.isLoggedIn = true;
    res.redirect('/');
};