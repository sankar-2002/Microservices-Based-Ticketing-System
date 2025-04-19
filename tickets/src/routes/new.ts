import express, { Request, Response } from 'express';
import {requireAuth, validateRequest} from '@grstickets/common';


const router = express.Router();

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});

//requireAuth is a middleware that checks if the user is authenticated

export { router as createTicketRouter };