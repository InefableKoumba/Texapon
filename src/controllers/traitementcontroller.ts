//importation du model zone dans le controller zone
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
//nouvelle instance de prisma
const prisma = new PrismaClient();

//RECUPERER UN TRAITEMENT PARTICULIER PAR SON ID (METHODE GET by ID)
export const traitementGetOneById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const traitement = await prisma.traitement.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    if (!traitement) {
      return res.status(404).json({
        message: `Aucun traitement trouvé avec ce numéro de série ${id}`,
      });
    }
    return res.status(200).json(traitement);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//RECUPERER TOUS LES TRAITEMENTS
export const traitementGetAll = async (req: Request, res: Response) => {
  try {
    const traitements = await prisma.traitement.findMany();
    const data: {
      model_generator: string | undefined;
      name_agent: string | undefined;
      regime: number | undefined;
      serie: string | undefined;
      generator_id: number;
      agent_id: number;
    }[] = [];
    for (const traitement of traitements) {
      const generator = await prisma.generator.findFirst({
        where: {
          id: traitement.generator_id,
        },
      });
      const agent = await prisma.agent.findFirst({
        where: {
          id: traitement.agent_id,
        },
      });

      data.push({
        ...traitement,
        model_generator: generator?.model_generator,
        name_agent: `${agent?.nom} ${agent?.prenom}`,
        regime: generator?.regime_fonctionnement,
        serie: generator?.serial_number,
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const traitementGetAllByAgentId = async (
  req: Request,
  res: Response
) => {
  const { agent_id } = req.body;
  try {
    const traitements = await prisma.traitement.findMany({
      where: {
        agent_id: parseInt(agent_id),
      },
      include: {
        generator: {
          include: {
            Site: {
              select: {
                name: true,
                id_site: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json(traitements);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//ENREGISTRER UN TRAITEMENT
export const createtraitement = async (req: Request, res: Response) => {
  const { generator_id, agent_id } = req.body;
  try {
    const traitement = await prisma.traitement.create({
      data: {
        generator_id,
        agent_id,
      },
    });
    return res.status(201).json(traitement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

//MODIFIER UN TRAITEMENT
export const updatetraitementByAgent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { date_estimative_prochaine_vidange } = req.body;
  try {
    const traitement = await prisma.traitement.update({
      where: {
        id: parseInt(id),
      },
      data: {
        date_estimative_prochaine_vidange,
      },
    });
    return res.status(201).json(traitement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
export const updatetraitementByAdmin = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { agent_id } = req.body;
  try {
    const traitement = await prisma.traitement.update({
      where: {
        id: parseInt(id),
      },
      data: {
        agent_id,
      },
    });
    return res.status(201).json(traitement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
