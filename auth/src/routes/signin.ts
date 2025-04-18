import express from 'express';
import { body } from 'express-validator';
import { Request, Response } from 'express';
import { validateRequest, BadRequestError } from '@grstickets/common';
import { User } from '../models/user';

import { Password } from '../services/password';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')  
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
], validateRequest, //this is a middleware function that checks if there are any validation errors in the request
 async (req: Request , res: Response) => {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    //if user is not found, throw an error
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);
    //compare the password entered by the user with the password stored in the database

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    //Generate JWT
   //this is a secret key that is used to sign the JWT token
    
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!); //adding ! to tell typescript that this value is not null or undefined

    //store it on session object
    req.session = { 
        jwt: userJwt // this is the JWT token that is used to authenticate the user
    };
    // this is the session object that is used to store the JWT token

    res.status(200).send(existingUser);


    
});

export { router as signinRouter };