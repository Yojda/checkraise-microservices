import express from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '@/src/lib/db';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        lives: 3,
        maxLives: 3,
        lastLifeLostAt: new Date(),
      },
    });

    return res.status(201).json({ message: 'User created', userId: user.id });
  } catch (err) {
    console.error('[REGISTER_ERROR]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
