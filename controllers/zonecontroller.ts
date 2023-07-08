//importation du model zone dans le controller zone
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
//nouvelle instance de prisma
const prisma = new PrismaClient();

//RECUPERER TOUTES LES ZONES (METHODE GET)
export const zoneGetAll = async (req: Request, res: Response) => {
  try {
    const zones = await prisma.zone.findMany();
    return res.json(zones);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//RECUPERER UNE ZONE EN PARTICULIER (METHODE GET by ID)
export const zoneGetOne = async (req: Request, res: Response) => {
  const zoneID = req.params.zone_id;
  try {
    const zone = await prisma.zone.findFirst({
      where: {
        zone_id: parseInt(zoneID),
      },
    });
    if (!zone) {
      return res
        .status(404)
        .json({ message: `Pas de zone avec l'id ${zoneID}` });
    }
    return res.status(200).json(zone);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//AJOUTER UNE NOUVELLE ZONE (METHODE POST)
export const createZone = async (req: Request, res: Response) => {
  const { name_zone } = req.body;
  try {
    const zone = await prisma.zone.create({
      data: {
        name_zone: name_zone,
      },
    });
    return res.status(201).json(zone);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//MODIFIER UNE ZONE (METHODE PUT)
export const updateZone = async (req: Request, res: Response) => {
  const zoneID = req.params.zone_id;
  const { name_zone } = req.body;
  if (isNaN(parseInt(zoneID)))
    return res.status(401).json({ message: "Only number" });
  if (!name_zone)
    return res.status(401).json({ message: "Veuillez fournir un nom" });
  try {
    const previous_zone = await prisma.zone.findFirst({
      where: {
        zone_id: parseInt(zoneID),
      },
    });
    if (!previous_zone)
      return res
        .status(401)
        .json({ message: "La zone avec l'id ... n'existe pas!" });
    const zone = await prisma.zone.update({
      where: {
        zone_id: parseInt(zoneID),
      },
      data: {
        name_zone: name_zone,
      },
    });
    return res.status(201).json(zone);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//SUPPRIMER UNE ZONE (METHODE DELETE)
export const DeleteZone = async (req: Request, res: Response) => {
  try {
    const zoneID = req.params.zone_id;
    const previous_zone = await prisma.zone.findFirst({
      where: {
        zone_id: parseInt(zoneID),
      },
    });
    if (!previous_zone)
      return res
        .status(404)
        .json({ message: `Pas de zone avec l'id ${zoneID}` });
    const zone = await prisma.zone.delete({
      where: {
        zone_id: parseInt(zoneID),
      },
    });

    res.status(200).json(zone);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
