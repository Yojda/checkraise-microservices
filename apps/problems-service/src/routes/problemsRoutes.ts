import express from "express";
import { prisma } from "../lib/db";
import {logs} from "@opentelemetry/api-logs";
import { trace, context, SpanKind } from '@opentelemetry/api';

export const router = express.Router();

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

/**
 * Health check
 */
router.get("/health", (_, res) => {
  res.json({ status: "ok", service: "problems-service" });
});

/**
 * Get all problems
 */
router.get("/", async (_, res) => {
  try {
    const problems = await prisma.problem.findMany();
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch problems" });
  }
});

/**
 * Get one problem by ID
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await prisma.problem.findUnique({
      where: { id: Number(id) },
    });
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving problem" });
  }
});

/**
 * Create a new problem (for testing or seeding)
 */
router.post("/create", async (req, res) => {
  const { title, description, options, answer } = req.body;

  if (!title || !description || !options || !answer) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const difficulties = ["easy", "medium", "hard"];
    const randomDifficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];

    const problem = await prisma.problem.create({
      data: {
        title,
        description,
        options,
        answer,
        difficulty: randomDifficulty,
      },
    });

    res.status(201).json({
      message: "Problem created",
      problemId: problem.id,
      difficulty: problem.difficulty,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create problem" });
  }
});

/**
 * Attempt a problem
 */
router.post("/attempt", async (req, res) => {
  const { userId, problemId, selected } = req.body;

  if (!userId || !problemId || selected === undefined) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
    });
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const isCorrect = problem.answer === selected;

    const attempt = await prisma.attempt.create({
      data: { userId, problemId, selected, isCorrect },
    });

    // Update or create ProblemState
    await prisma.problemState.upsert({
      where: { userId_problemId: { userId, problemId } },
      update: { status: isCorrect ? "solved" : "failed" },
      create: { userId, problemId, status: isCorrect ? "solved" : "failed" },
    });

    res.json({ attempt, correct: isCorrect });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process attempt" });
  }
});

export default router;
