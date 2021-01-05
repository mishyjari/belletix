import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string 
};

// Augment Request typing to include UserPayload
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
};

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Extract data from jwt cookie and set on req.currentUser if exists
    if ( !req.session?.jwt ) return next();

    try {
        const payload = jwt.verify( req.session.jwt, process.env.JWT_KEY! ) as UserPayload;
        req.currentUser = payload;
    }
    catch ( err ) {
        console.log(err)
    }
    next();
}