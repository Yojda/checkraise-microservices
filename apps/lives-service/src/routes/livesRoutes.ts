import { Router, Request, Response } from 'express';
import { prisma } from '../lib/db';
import {logs} from "@opentelemetry/api-logs";
import { trace, context, SpanKind } from '@opentelemetry/api';

const router = Router();
const logger = logs.getLogger('lives-service', '1.0.0');
const tracer = trace.getTracer('lives-service');

router.use(async (req, res, next) => {
  const spanName = `${req.method} ${req.originalUrl}`;
  await tracer.startActiveSpan(spanName, { kind: SpanKind.SERVER }, async (span) => {
    res.on('finish', () => {
      span.setAttribute('http.status_code', res.statusCode);
      span.end();
    });
    next();
  });
});

router.use((req, res, next) => {
  logger.emit({
    severityText: 'INFO',
    body: `Requête ${req.method} ${req.originalUrl}`,
    attributes: {
      component: req.originalUrl,
      service_name: 'lives-service',
      env: 'dev',
    },
  });
  next();
});

// GET /lives/get?email=...
router.get('/get', async (req: Request, res: Response) => {
  const email = req.query.email as string;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Bonus quotidien : +1 vie si dernière perte > 24h
    const now = new Date();
    let lives = user.lives;
    if (user.lastLifeLostAt) {
      const hoursSinceLost = (now.getTime() - user.lastLifeLostAt.getTime()) / 1000 / 3600;
      if (hoursSinceLost >= 24 && lives < user.maxLives) {
        lives = lives + 1 > user.maxLives ? user.maxLives : lives + 1;
        await prisma.user.update({
          where: { id: user.id },
          data: { lives },
        });
      }
    }

    res.json({ lives, maxLives: user.maxLives, lastLifeLostAt: user.lastLifeLostAt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch lives' });
  }
});

// POST /lives/update
router.post('/update', async (req: Request, res: Response) => {
  const { email, lives } = req.body;
  if (!email || lives === undefined) return res.status(400).json({ error: 'Email and lives required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const newLives = lives > user.maxLives ? user.maxLives : lives;
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { lives: newLives },
    });

    res.json({ message: 'Lives updated', lives: updatedUser.lives });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update lives' });
  }
});

// POST /lives/max
router.post('/max', async (req: Request, res: Response) => {
  const { email, maxLives } = req.body;
  if (!email || !maxLives) return res.status(400).json({ error: 'Email and maxLives required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { maxLives },
    });

    res.json({ message: 'Max lives updated', maxLives: updatedUser.maxLives });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update maxLives' });
  }
});

// POST /lives/lost
router.post('/lost', async (req: Request, res: Response) => {
  const { email, date } = req.body;
  if (!email || !date) return res.status(400).json({ error: 'Email and date required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { lastLifeLostAt: new Date(date) },
    });

    res.json({ message: 'Last life lost date updated', lastLifeLostAt: updatedUser.lastLifeLostAt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update lastLifeLostAt' });
  }
});

router.get('/health', (_req, res) => res.json({ status: 'ok' }));


export default router;
