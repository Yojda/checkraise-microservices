import { prisma } from "@/src/lib/db";
import jwt from "jsonwebtoken";
import { Request } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

/**
 * Récupère l'utilisateur courant à partir du token JWT dans l'en-tête Authorization
 */
export async function getCurrentUser(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("Missing token");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Missing token");

  try {
    const payload: any = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) throw new Error("User not found");
    return user;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

/**
 * Met à jour les vies d'un utilisateur
 */
export async function updateLife(req: Request, updatedLives: number) {
  const user = await getCurrentUser(req);

  if (updatedLives < 0) throw new Error("No lives left");
  if (updatedLives > user.maxLives) updatedLives = user.maxLives;

  return prisma.user.update({
    where: { id: user.id },
    data: { lives: updatedLives },
  });
}

/**
 * Met à jour le max de vies
 */
export async function updateMaxLife(req: Request, updatedMaxLives: number) {
  const user = await getCurrentUser(req);

  if (updatedMaxLives <= 0) throw new Error("MaxLives must be greater than 0");

  return prisma.user.update({
    where: { id: user.id },
    data: { maxLives: updatedMaxLives },
  });
}

/**
 * Met à jour la date de la dernière vie perdue
 */
export async function updateDateLastLifeLostAt(req: Request, date: Date) {
  const user = await getCurrentUser(req);
  return prisma.user.update({
    where: { id: user.id },
    data: { lastLifeLostAt: date },
  });
}

/**
 * Récupère les informations de vies d'un utilisateur
 */
export async function getUserLivesInfo(req: Request) {
  const user = await getCurrentUser(req);
  return user;
}
