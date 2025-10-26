import './tracing';
import { metricsMiddleware } from './tracing';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import {logs, SeverityNumber} from "@opentelemetry/api-logs";
const { context, propagation } = require('@opentelemetry/api');

const logger = logs.getLogger('server');

const app = express();

app.use(cors({
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.use(metricsMiddleware);

app.use(express.json());

app.use('/auth', authRoutes);

app.use((req, res, next) => {
  const ctx = propagation.extract(context.active(), req.headers);
  context.with(ctx, next);
});

app.listen(Number(process.env.PORT || '5000'), () => {
    console.log(`Auth service running on port ${process.env.PORT || '5000'}`);
});
