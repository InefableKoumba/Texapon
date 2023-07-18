//importation du model zone dans le controller zone
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { Request, Response } from "express";
//nouvelle instance de prisma
const prisma = new PrismaClient();

//CREER UNE VIDANGE
export const createVidange = async (req: Request, res: Response) => {
  // Id du traitement dans lequel on veut ajouter la vidange
  const traitement_id = req.params.id;
  // Récupérer le traiment pour le garder en mémoire
  const traitement = await prisma.traitement.findFirst({
    where: {
      id: parseInt(traitement_id),
    },
    include: {
      generator: true,
    },
  });

  // Vérifier si le traitement existe
  if (traitement == null) {
    return res.status(404).json({ message: "Traitement inexistant" });
  }
  // Nombre d'heures recueilli par l'agent
  const { nbre_heures } = req.body;
  // On doit récupérer la dernière vidange de ce traitement
  // pour avoir le nombre d'heure au dernier passage
  const vidanges = await prisma.vidange.findMany({
    where: {
      traitement_id: parseInt(traitement_id),
    },
  });

  // Vérifier si c'est la toute prémière vidange faite dans ce site
  if (vidanges.length == 0) {
    const regime = traitement.generator.regime_fonctionnement;
    // Calcul de la date estimative de la prochaine vidange
    const date_estimative_prochaine_vidange = dayjs(Date.now()).add(
      Math.ceil(250) / regime,
      "days"
    );
    await prisma.traitement.update({
      where: {
        id: parseInt(traitement_id),
      },
      data: {
        date_estimative_prochaine_vidange:
          date_estimative_prochaine_vidange.toDate(),
      },
    });
    // Sauvergarder la vidange
    await prisma.vidange.create({
      data: {
        nbre_heures,
        date_exec: dayjs(Date()).toDate(),
        nbre_heures_retard: 0,
        traitement_id: traitement.id,
      },
    });
    return res.status(201).json({ message: "Vidange enregistrée" });
  }
  // Récupérer la toute dernière vidange dans le tableau
  const last_vidange = vidanges[vidanges.length - 1];
  // Calculer la différence entre le nombre d'heures
  // envoyé par l'agent et le nombre d'heures de la dernière vidange
  const diff_nbre_heures = nbre_heures - last_vidange.nbre_heures;
  // Gérer les différents cas de figure selon la valeur de
  // la différence de nombre d'heures
  const regime = Math.round(
    diff_nbre_heures / dayjs(Date.now()).diff(last_vidange.date_exec, "days")
  );
  //Vérifier si le régime trouve diffère de celui sauvegardé dans la bd
  // Si c'est le cas, le mettre à jour, ne rien faire le cas écheant
  if (traitement?.generator.regime_fonctionnement != regime) {
    // Mettre à jour le régime
    await prisma.generator.update({
      where: {
        id: traitement?.generator.id,
      },
      data: {
        regime_fonctionnement: regime,
      },
    });
  }
  // Calcul de la date estimative de la prochaine vidange
  const date_estimative_prochaine_vidange = dayjs(Date.now()).add(
    Math.round(250) / regime,
    "days"
  );

  const diff = nbre_heures - last_vidange.nbre_heures;

  await prisma.traitement.update({
    where: {
      id: parseInt(traitement_id),
    },
    data: {
      date_estimative_prochaine_vidange: dayjs(
        date_estimative_prochaine_vidange
      ).toDate(),
    },
  });

  if (diff <= 250) {
    await prisma.vidange.create({
      data: {
        nbre_heures,
        date_exec: dayjs(Date()).toDate(),
        nbre_heures_retard: 0,
        traitement_id: traitement.id,
      },
    });
  } else {
    await prisma.vidange.create({
      data: {
        nbre_heures,
        date_exec: dayjs(Date()).toDate(),
        nbre_heures_retard: Math.abs(250 - diff),
        traitement_id: traitement.id,
      },
    });
  }

  return res.status(201).json({
    newRegime: regime,
    dateEstimativeProchaineVidange: date_estimative_prochaine_vidange,
  });
};

// Envoyer un aperçu du resultat de la vidange à l'utilisateur
// regime-date estimative prochaine vidage - diff nbre d'heures - retard
export const getOverview = async (req: Request, res: Response) => {
  // Id du traitement dans lequel on veut ajouter la vidange
  const traitement_id = req.params.id;
  // Récupérer le traiment pour le garder en mémoire
  const traitement = await prisma.traitement.findFirst({
    where: {
      id: parseInt(traitement_id),
    },
    include: {
      generator: true,
    },
  });

  // Vérifier si le traitement existe
  if (traitement == null) {
    return res.status(404).json({ message: "Traitement inexistant" });
  }
  // Nombre d'heures recueilli par l'agent
  const { nbre_heures } = req.body;
  // On doit récupérer la dernière vidange de ce traitement
  // pour avoir le nombre d'heure au dernier passage
  const vidanges = await prisma.vidange.findMany({
    where: {
      traitement_id: parseInt(traitement_id),
    },
  });

  // Vérifier si c'est la toute prémière vidange faite dans ce site
  if (vidanges.length == 0) {
    const regime = traitement.generator.regime_fonctionnement;
    // Calcul de la date estimative de la prochaine vidange
    const date_estimative_prochaine_vidange = dayjs(Date.now()).add(
      Math.ceil(250) / regime,
      "days"
    );
    return res.status(200).json({
      regime,
      diff_nbre_heures: 0,
      date_estimative_prochaine_vidange,
      retard: 0,
    });
  }
  // Récupérer la toute dernière vidange dans le tableau
  const last_vidange = vidanges[vidanges.length - 1];
  // Calculer la différence entre le nombre d'heures
  // envoyé par l'agent et le nombre d'heures de la dernière vidange
  const diff_nbre_heures = nbre_heures - last_vidange.nbre_heures;
  // Gérer les différents cas de figure selon la valeur de
  // la différence de nombre d'heures
  const regime = Math.round(
    diff_nbre_heures / dayjs(Date.now()).diff(last_vidange.date_exec, "days")
  );

  if (regime == Infinity)
    return res.status(401).json({
      message: "Impossible de faire la vidange deux fois le même jour",
    });
  // Calcul de la date estimative de la prochaine vidange
  const date_estimative_prochaine_vidange = dayjs(Date.now()).add(
    Math.ceil(250) / regime,
    "days"
  );

  // Sauvergarder la vidange
  const diff = nbre_heures - last_vidange.nbre_heures;
  if (diff <= 250) {
    return res.status(200).json({
      regime,
      diff_nbre_heures,
      date_estimative_prochaine_vidange,
      retard: 0,
    });
  } else {
    return res.status(200).json({
      regime,
      diff_nbre_heures,
      date_estimative_prochaine_vidange,
      retard: Math.abs(250 - diff),
    });
  }
};

export const vidangeGetAllByTreatmentId = async (
  req: Request,
  res: Response
) => {
  const treatment_id = req.params.id;
  try {
    const vidanges = await prisma.vidange.findMany({
      where: {
        traitement_id: parseInt(treatment_id),
      },
    });
    return res.json(vidanges);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const vidangeGetAll = async (req: Request, res: Response) => {
  try {
    const vidanges = await prisma.vidange.findMany();
    return res.json(vidanges);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const vidangeGetAllByMonth = async (req: Request, res: Response) => {
  const { month, year } = req.params;
  try {
    const vidanges = await prisma.vidange.findMany({
      include: {
        traitement: {
          include: {
            agent: true,
            generator: {
              include: {
                Site: true,
              },
            },
          },
        },
      },
    });
    const data = [];
    for (const vidange of vidanges) {
      if (
        dayjs(vidange.date_exec).month() == parseInt(month) &&
        dayjs(vidange.date_exec).year() == parseInt(year)
      ) {
        data.push(vidange);
      }
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const vidangeGetOne = async (req: Request, res: Response) => {
  const { vidange_id } = req.params;
  try {
    const vidanges = await prisma.vidange.findFirst({
      where: {
        traitement_id: parseInt(vidange_id),
      },
    });
    return res.json(vidanges);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
