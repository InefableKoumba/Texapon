/*
  Warnings:

  - The primary key for the `Zone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Zone` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_zone_id_fkey";

-- AlterTable
ALTER TABLE "Zone" DROP CONSTRAINT "Zone_pkey",
DROP COLUMN "id",
ADD COLUMN     "zone_id" SERIAL NOT NULL,
ADD CONSTRAINT "Zone_pkey" PRIMARY KEY ("zone_id");

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "Zone"("zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;
