import { BadRequestError } from './../errors/bad-request-error';
import { NextFunction } from 'express';
import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { validateRequest } from '../middleware/validate-request';
const router = express.Router();

router.post('/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters')
    ], validateRequest, //this is a middleware function that checks if there are any validation errors in the request
     async (req: Request, res: Response) => {

        const {email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({email, password});
        await user.save();

        //Generate JWT
        //this is a secret key that is used to sign the JWT token

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!); //adding ! to tell typescript that this value is not null or undefined

        //store it on session object
        req.session = { 
            jwt: userJwt // this is the JWT token that is used to authenticate the user
        };
        // this is the session object that is used to store the JWT token

        res.status(201).send(user);
        
});

export { router as signupRouter };