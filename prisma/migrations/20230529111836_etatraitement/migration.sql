/*
  Warnings:

  - You are about to drop the column `hasBeenTreated` on the `Traitement` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EtatTraitements" AS ENUM ('ASSIGNED', 'WORKING_PROGRESS', 'CLOSED_COMPLETE');

-- AlterTable
ALTER TABLE "Traitement" DROP COLUMN "hasBeenTreated",
ADD COLUMN     "EtatTraitement" "EtatTraitements" NOT NULL DEFAULT 'ASSIGNED';
