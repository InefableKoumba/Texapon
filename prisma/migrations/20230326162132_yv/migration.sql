/*
  Warnings:

  - You are about to drop the column `agent_id` on the `Site` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Site" DROP COLUMN "agent_id",
ADD COLUMN     "matricule_agent" TEXT;
