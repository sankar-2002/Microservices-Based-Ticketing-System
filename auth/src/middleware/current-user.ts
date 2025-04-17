// middleware to check if the user is authenticated by verifying the JWT token in the session
// and attaching the user information to the request object for later use in route handlers.

import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'; 

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload; // Optional property to hold the current user payload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {

    if (!req.session?.jwt) { 
        // equivalent to if (req.session === undefined || req.session.jwt === undefined)
        // If there is no JWT in the session, the user is not authenticated
        return next(); // Call next() to move to the next middleware or route handler
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        // Verify the JWT token using the secret key and cast the payload to UserPayload type
        req.currentUser = payload; // Attach the payload to the request object for later use
        //here the currentUser is a custom property that we are adding to the request object
        // This allows us to access the user information in subsequent middleware or route handlers
    } catch (err) {
        // If JWT verification fails, do nothing and let the request continue

    }

    next(); // Call next() to move to the next middleware or route handler
}