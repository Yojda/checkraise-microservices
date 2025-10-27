import {Router} from 'express';
import bcrypt from 'bcryptjs';
import {prisma} from '../lib/db';
import jwt from 'jsonwebtoken';
import * as otelLogs from "@opentelemetry/api-logs";
import {logs} from "@opentelemetry/api-logs";
import { trace, context, SpanKind } from '@opentelemetry/api';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
const logger = logs.getLogger('auth-service', '1.0.0');
const tracer = trace.getTracer('auth-service');

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
      service_name: 'auth-service',
      env: 'dev',
    },
  });
  next();
});

// ========================
// HEALTH CHECK
// ========================
router.get('/health', async (req, res) => {
  try {
  await prisma.$queryRaw`SELECT 1`;
      res.status(200).json({status: 'ok', db: 'connected'});
  } catch (err) {
      res.status(500).json({status: 'error', db: 'unreachable', error: err});
  }
});

// ========================
// REGISTER
// ========================
router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({error: 'Missing fields'});
    }

    const exists = await prisma.user.findUnique({where: {email}});
    if (exists) {
        return res.status(409).json({error: 'User already exists'});
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {username, email, password: hashed},
    });

    res.status(201).json({message: 'User created', userId: user.id});
});

// ========================
// LOGIN
// ========================
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    setTimeout(() => {}, 200); // Mitigation delay

    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
        return res.status(401).json({error: 'Invalid credentials'});
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(401).json({error: 'Invalid credentials'});
    }

    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '1h'});
    res.json({message: 'Login successful', token});
});

// ========================
// ME (protected)
// ========================
router.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({error: 'Missing token'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload: any = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({where: {id: payload.userId}});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        res.json({id: user.id, username: user.username, email: user.email});
    } catch (err) {
        res.status(401).json({error: 'Invalid token'});
    }
});

export default router;
