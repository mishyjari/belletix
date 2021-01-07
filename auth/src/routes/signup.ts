import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@mfrattaroli/common';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post(
    '/api/users/signup', 
    [
        // Validation middleware
        body('email')
            .trim()
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters')
    ],
    validateRequest,
    async( req: Request, res: Response ) => {    
        const errors = validationResult(req);
        const { email, password } = req.body;
        
        // Check if email is unique
        const existingUser = await User.findOne({ email });
        if ( existingUser ) {
            throw new BadRequestError('Email already in use');
        };

        // Create Password Hash


        // Create user entry in database
        const user = User.build({
            email,
            password
        });
        await user.save();

        // Generate JSON Web Token

        const userJWT = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        // Set cookie on session
        req.session = {
            jwt: userJWT
        };
        res.status(201).send(user);
});

export { router as signupRouter };