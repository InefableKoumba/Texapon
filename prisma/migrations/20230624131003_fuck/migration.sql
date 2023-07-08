/*
  Warnings:

  - Made the column `nbre_heures` on table `Vidange` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nbre_jours_retard` on table `Vidange` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vidange" ALTER COLUMN "nbre_heures" SET NOT NULL,
ALTER COLUMN "nbre_jours_retard" SET NOT NULL,
ALTER COLUMN "nbre_jours_retard" SET DEFAULT 0;
