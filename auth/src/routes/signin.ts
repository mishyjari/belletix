import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req,res) => {
    res.send('POST /api/users/signin - OK - Auth Server @ 3000')
});

export { router as signinRouter };