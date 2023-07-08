-- CreateEnum
CREATE TYPE "Postes" AS ENUM ('FIELDS_ENGINEER', 'FIELDS_SUPERVISOR', 'SERVICE_PLANIFICATION', 'ANALYSTE_MAINTENANCE');

-- CreateEnum
CREATE TYPE "Services" AS ENUM ('SERVICE_HTC');

-- CreateTable
CREATE TABLE "Zone" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "id_site" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "site_sne" BOOLEAN NOT NULL DEFAULT true,
    "zone_id" INTEGER NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generator" (
    "id" SERIAL NOT NULL,
    "serial_number" TEXT NOT NULL,
    "model_generator" TEXT NOT NULL,
    "regime_fonctionnement" INTEGER NOT NULL,
    "capacity" TEXT NOT NULL,
    "id_site" INTEGER NOT NULL,

    CONSTRAINT "Generator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Traitement" (
    "id" SERIAL NOT NULL,
    "seuil_a_vidanger" INTEGER NOT NULL,
    "date_derniere_vidange" TIMESTAMP(3) NOT NULL,
    "NHs_derniere_vidange" INTEGER NOT NULL,
    "date_actuelle" TIMESTAMP(3) NOT NULL,
    "NHs_actuels" INTEGER NOT NULL,
    "difference_NHs" INTEGER NOT NULL,
    "date_estimative_prochaine_vidange" TIMESTAMP(3) NOT NULL,
    "generator_id" INTEGER NOT NULL,
    "agent_id" INTEGER NOT NULL,

    CONSTRAINT "Traitement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "matricule_agent" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "Postes" "Postes" NOT NULL,
    "Services" "Services" NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Site_id_site_key" ON "Site"("id_site");

-- CreateIndex
CREATE UNIQUE INDEX "Generator_serial_number_key" ON "Generator"("serial_number");

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Generator" ADD CONSTRAINT "Generator_id_site_fkey" FOREIGN KEY ("id_site") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Traitement" ADD CONSTRAINT "Traitement_generator_id_fkey" FOREIGN KEY ("generator_id") REFERENCES "Generator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Traitement" ADD CONSTRAINT "Traitement_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
