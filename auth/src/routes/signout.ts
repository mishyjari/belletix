import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req,res) => {
    res.send('POST /api/users/signout - OK - Auth Server @ 3000')
});

export { router as signoutRouter };