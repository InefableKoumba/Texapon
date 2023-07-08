/*
  Warnings:

  - Added the required column `photo_link` to the `Traitement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Traitement" ADD COLUMN     "photo_link" TEXT NOT NULL;
