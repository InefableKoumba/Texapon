//importation du model zone dans le controller zone
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
//nouvelle instance de prisma
const prisma = new PrismaClient();

//RECUPERER TOUS LES GENERATEURS (METHODE GET)
export const generatorGetAll = async (req: Request, res: Response) => {
  try {
    const generators = await prisma.generator.findMany();
    const data: {
      site_name: string | undefined;
      id: number;
      serial_number: string;
      model_generator: string;
      regime_fonctionnement: number;
      capacity: string;
      id_site: string;
    }[] = [];
    for (const generator of generators) {
      const site = await prisma.site.findFirst({
        where: {
          id_site: generator.id_site,
        },
      });
      data.push({ ...generator, site_name: site?.name });
      // console.log(data);
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//RECUPERER UN GENERATEUR EN PARTICULIER (METHODE GET by ID)
export const generatorGetOne = async (req: Request, res: Response) => {
  const serial_number = req.params.serial_number;
  try {
    const generator = await prisma.generator.findFirst({
      where: {
        serial_number: serial_number,
      },
    });
    if (!generator) {
      return res.status(404).json({
        message: `Pas de generateur avec ce numéro de série ${serial_number}`,
      });
    }
    return res.status(200).json(generator);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//AJOUTER UN NOUVEAU GENERATEUR (METHODE POST)
export const creategenerator = async (req: Request, res: Response) => {
  const {
    serial_number,
    model_generator,
    regime_fonctionnement,
    capacity,
    id_site,
  } = req.body;
  try {
    const generator = await prisma.generator.create({
      data: {
        serial_number: serial_number,
        model_generator: model_generator,
        regime_fonctionnement: regime_fonctionnement,
        capacity: capacity,
        id_site: id_site,
      },
    });
    return res.status(201).json(generator);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//MODIFIER UN GENERATEUR (METHODE PUT)
export const updategenerator = async (req: Request, res: Response) => {
  const serial_number = req.params.serial_number;
  const { model_generator, regime_fonctionnement, capacity } = req.body;
  if (!serial_number)
    return res.status(401).json({
      message: "Veuillez renseignez le numéro de série du générateur",
    });
  try {
    const previous_generator = await prisma.generator.findFirst({
      where: {
        serial_number: serial_number,
      },
    });
    if (!previous_generator)
      return res.status(401).json({
        message: "Le générateur avec ce numéro de série n'existe pas!",
      });
    const generator = await prisma.generator.update({
      where: {
        serial_number: serial_number,
      },
      data: {
        serial_number: serial_number,
        model_generator: model_generator,
        regime_fonctionnement: regime_fonctionnement,
        capacity: capacity,
      },
    });
    return res.status(201).json(generator);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//SUPPRIMER UN GENERATEUR (METHODE DELETE)
export const Deletegenerator = async (req: Request, res: Response) => {
  try {
    const serial_number = req.params.serial_number;
    const previous_generator = await prisma.generator.findFirst({
      where: {
        serial_number: serial_number,
      },
    });
    if (!previous_generator)
      return res.status(404).json({
        message: `Pas de générateur avec ce numéro de série ${serial_number}`,
      });
    const generator = await prisma.generator.delete({
      where: {
        serial_number: serial_number,
      },
    });

    res.status(200).json(generator);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
