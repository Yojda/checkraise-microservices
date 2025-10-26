import express from 'express';
import cookieParser from 'cookie-parser';
import { jwtVerify } from 'jose';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const secret = new TextEncoder().encode(JWT_SECRET);

// Middleware to parse cookies
router.use(cookieParser());

router.get('/me', async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ user: null, isAuthenticated: false });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return res.json({
      user: {
        id: payload.userId,
        username: payload.name,
        role: payload.role,
        email: payload.email,
      },
      isAuthenticated: true,
    });
  } catch (err) {
    console.error('[ME_ERROR]', err);
    return res.json({ user: null, isAuthenticated: false });
  }
});

export default router;
