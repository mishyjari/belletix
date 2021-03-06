import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@mfrattaroli/common';
import { User } from '../models/user';
import { PasswordManager } from '../services/passwordManager'


const router = express.Router();

router.post('/api/users/signin', 
[  
    // Request validation
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must enter a password')
],
validateRequest,
async( req: Request, res: Response ) => {
    const { email, password } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if ( !existingUser ) throw new BadRequestError('Invalid Credentials');

    // Match passwords
    const passwordsMatch = await PasswordManager.compare(existingUser.password, password);

    if ( !passwordsMatch ) throw new BadRequestError('Invalid Credentials');

    // Generate JSON Web Token
    const userJWT = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    },
        process.env.JWT_KEY!);

    // Set cookie on session
    req.session = {
        jwt: userJWT
    };
    res.status(200).send(existingUser);
});

export { router as signinRouter };