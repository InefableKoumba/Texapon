/*
  Warnings:

  - You are about to drop the column `NHs_actuels` on the `Traitement` table. All the data in the column will be lost.
  - You are about to drop the column `NHs_derniere_vidange` on the `Traitement` table. All the data in the column will be lost.
  - You are about to drop the column `date_actuelle` on the `Traitement` table. All the data in the column will be lost.
  - You are about to drop the column `date_derniere_vidange` on the `Traitement` table. All the data in the column will be lost.
  - You are about to drop the column `difference_NHs` on the `Traitement` table. All the data in the column will be lost.
  - You are about to drop the column `seuil_a_vidanger` on the `Traitement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Traitement" DROP COLUMN "NHs_actuels",
DROP COLUMN "NHs_derniere_vidange",
DROP COLUMN "date_actuelle",
DROP COLUMN "date_derniere_vidange",
DROP COLUMN "difference_NHs",
DROP COLUMN "seuil_a_vidanger";

-- CreateTable
CREATE TABLE "Vidange" (
    "id" SERIAL NOT NULL,
    "date_exec" TIMESTAMP(3),
    "nbre_heures" INTEGER,
    "nbre_jours_retard" INTEGER,
    "traitement_id" INTEGER NOT NULL,

    CONSTRAINT "Vidange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vidange" ADD CONSTRAINT "Vidange_traitement_id_fkey" FOREIGN KEY ("traitement_id") REFERENCES "Traitement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
