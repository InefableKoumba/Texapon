/*
  Warnings:

  - You are about to drop the column `Postes` on the `Agent` table. All the data in the column will be lost.
  - You are about to drop the column `Services` on the `Agent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[matricule_agent]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `poste` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `Agent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Services" ADD VALUE 'CLIENT_DIVERS';

-- DropForeignKey
ALTER TABLE "Generator" DROP CONSTRAINT "Generator_id_site_fkey";

-- AlterTable
ALTER TABLE "Agent" DROP COLUMN "Postes",
DROP COLUMN "Services",
ADD COLUMN     "poste" "Postes" NOT NULL,
ADD COLUMN     "service" "Services" NOT NULL;

-- AlterTable
ALTER TABLE "Generator" ALTER COLUMN "id_site" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Traitement" ALTER COLUMN "date_actuelle" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Agent_matricule_agent_key" ON "Agent"("matricule_agent");

-- AddForeignKey
ALTER TABLE "Generator" ADD CONSTRAINT "Generator_id_site_fkey" FOREIGN KEY ("id_site") REFERENCES "Site"("id_site") ON DELETE RESTRICT ON UPDATE CASCADE;
