import express from 'express';

import { currentUser }from '../middlewares/currentUser';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req,res) => {
    console.log('GET /api/users/currentuser - OK - Auth Server @ 3000')
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter }