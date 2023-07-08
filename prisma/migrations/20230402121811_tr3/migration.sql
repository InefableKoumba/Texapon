-- AlterTable
ALTER TABLE "Traitement" ADD COLUMN     "hasBeenTreated" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "date_actuelle" DROP NOT NULL,
ALTER COLUMN "date_actuelle" DROP DEFAULT,
ALTER COLUMN "NHs_actuels" DROP NOT NULL,
ALTER COLUMN "difference_NHs" DROP NOT NULL,
ALTER COLUMN "date_estimative_prochaine_vidange" DROP NOT NULL;
