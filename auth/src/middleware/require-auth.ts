import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {

    if (!req.currentUser) {
        throw new NotAuthorizedError(); // If the user is not authenticated, throw a NotAuthorizedError
        // This error can be handled by a global error handler middleware to send a 401 Unauthorized response
        // If the user is not authenticated, send a 401 Unauthorized response
    }

    next(); // Call next() to move to the next middleware or route handler
}