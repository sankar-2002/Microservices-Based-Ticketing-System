import express from 'express';
const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there!');
});

export { router as currentUserRouter };
// This code defines an Express router that handles GET requests to the "/api/users/currentuser" endpoint.