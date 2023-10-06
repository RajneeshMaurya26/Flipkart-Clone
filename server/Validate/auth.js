import {check, validationResult} from 'express-validator';

export const validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('First name is required'),
    check('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
    check('email')
    .isEmail()
    .withMessage('Valid email is required'),
    check('password')
    .isLength({min:6})
    .withMessage('Passwod must be at list 6 digit')
];
export const validateSigninRequest = [
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({min:6}).withMessage('Valid password is required')
];

export const validatedRequest = async(req, res, next) => {
    const errors = await validationResult(req);
    if(!errors.isEmpty()){
        res.status(500).json({error:errors.array()[0].msg});
    }else{
        next();
    }
    
}