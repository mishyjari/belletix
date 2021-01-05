import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req,res) => {
    req.session = null;

    console.log('POST /api/users/signout - OK - Auth Server @ 3000');
    res.send({});
});

export { router as signoutRouter };