
//route Handler for the "/api/users/currentuser" endpoint
// This endpoint checks if the user is currently authenticated by verifying the JWT token stored in the session
// and returns the current user information if authenticated, or null if not authenticated.

import express from 'express';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { currentUser } from '../middleware/current-user';

const router = express.Router();

router.get('/api/users/currentuser',currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
    // If the user is authenticated, send the current user information; otherwise, send null
});

export { router as currentUserRouter };
// This code defines an Express router that handles GET requests to the "/api/users/currentuser" endpoint.