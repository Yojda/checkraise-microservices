-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'medium', 'hard');

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'medium';
