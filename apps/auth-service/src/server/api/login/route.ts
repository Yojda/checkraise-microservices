import express from 'express';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import { prisma } from '@/src/lib/db';
import { SignJWT } from 'jose';

const router = express.Router();
router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const encoder = new TextEncoder();
const secret = encoder.encode(JWT_SECRET);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = await new SignJWT({
      userId: user.id,
      name: user.username,
      role: user.role,
      email: user.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in ms
      sameSite: 'lax',
    });

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('[LOGIN_ERROR]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
