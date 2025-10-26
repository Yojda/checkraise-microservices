/*
  Warnings:

  - The `difficulty` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" TEXT NOT NULL DEFAULT 'medium';

-- DropEnum
DROP TYPE "public"."Difficulty";
