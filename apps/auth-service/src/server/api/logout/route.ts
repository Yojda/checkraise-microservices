import express from 'express';
const router = express.Router();

router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // Expire immediately
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return res.json({ message: 'Déconnecté' });
});

export default router;
