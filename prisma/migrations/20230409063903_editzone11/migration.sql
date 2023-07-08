/*
  Warnings:

  - You are about to drop the column `name` on the `Zone` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Zone" DROP COLUMN "name",
ADD COLUMN     "name_zone" TEXT;
