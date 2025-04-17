import express from 'express';
const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    // Invalidate the session by removing the JWT token from the session object
    req.session = null; // This effectively signs the user out by clearing the session
    res.send({}); // Send an empty response to indicate successful sign-out
  
});

export { router as signoutRouter };