/*
  Warnings:

  - You are about to drop the column `nbre_jours_retard` on the `Vidange` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vidange" DROP COLUMN "nbre_jours_retard",
ADD COLUMN     "nbre_heures_retard" INTEGER NOT NULL DEFAULT 0;
