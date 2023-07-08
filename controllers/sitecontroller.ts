//importation du model zone dans le controller zone
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
//nouvelle instance de prisma
const prisma = new PrismaClient();

//RECUPERER TOUS LES SITES (METHODE GET)
export const siteGetAll = async (req: Request, res: Response) => {
  try {
    const sites = await prisma.site.findMany();
    const formatedData: {}[] = [];

    for (const site of sites) {
      const zone = await prisma.zone.findFirst({
        where: {
          zone_id: site.zone_id,
        },
      });
      let agent = null;
      if (site.matricule_agent) {
        agent = await prisma.agent.findFirst({
          where: {
            matricule_agent: site.matricule_agent,
          },
        });
      }
      formatedData.push({
        ...site,
        zone: zone?.name_zone,
        owner: `${agent?.nom} ${agent?.prenom}`,
      });
    }
    return res.json(formatedData);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//RECUPERER UN SITE EN PARTICULIER (METHODE GET by ID)
export const siteGetOne = async (req: Request, res: Response) => {
  const id_site = req.params.id_site;
  try {
    const site = await prisma.site.findFirst({
      where: {
        id_site: id_site,
      },
    });
    if (!site) {
      return res
        .status(404)
        .json({ message: `Pas de site avec l'id ${id_site}` });
    }
    return res.status(200).json(site);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const siteGetManyByZoneId = async (req: Request, res: Response) => {
  const zone_id = req.params.zone_id;
  try {
    const sites = await prisma.site.findMany({
      where: {
        zone_id: parseInt(zone_id),
      },
    });
    return res.status(200).json(sites);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//RECHERCHE PAR NOM DU SITE
export const siteSearch = async (req: Request, res: Response) => {
  const id_site = req.body.id_site;
  const name = req.body.name;
  if (!id_site && !name)
    return res.status(404).json({ message: "Il manque le nom et l'id" });
  try {
    const site = await prisma.site.findFirst({
      where: {
        id_site: id_site,
        AND: {
          name: name,
        },
      },
    });
    if (!site) {
      if (name)
        return res
          .status(404)
          .json({ message: `Pas de site avec le nom ${name}` });
      if (id_site)
        return res
          .status(404)
          .json({ message: `Pas de site avec l'id ${id_site}` });
    }
    return res.status(200).json(site);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//AJOUTER UN NOUVEAU SITE (METHODE POST)
export const createsite = async (req: Request, res: Response) => {
  console.log(req.body);
  const { id_site, name, site_sne, zone_id, matricule_agent } = req.body;
  try {
    const site = await prisma.site.create({
      data: {
        id_site,
        name,
        site_sne,
        zone_id,
        matricule_agent,
      },
    });
    return res.status(201).json(site);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

//MODIFIER UN SITE (METHODE PUT)
export const updatesite = async (req: Request, res: Response) => {
  const id_site = req.params.id_site;
  const { name, site_sne } = req.body;
  if (!id_site)
    return res
      .status(401)
      .json({ message: "Veuillez renseignez l'id du site" });
  if (!name)
    return res
      .status(401)
      .json({ message: "Veuillez renseignez le nom du site" });
  if (!site_sne)
    return res
      .status(401)
      .json({ message: "Veuillez renseignez le type de site" });
  try {
    const previous_site = await prisma.site.findFirst({
      where: {
        id_site: id_site,
      },
    });
    if (!previous_site)
      return res
        .status(401)
        .json({ message: "Le site avec l'id ... n'existe pas!" });
    const site = await prisma.site.update({
      where: {
        id_site: id_site,
      },
      data: {
        id_site: id_site,
        name: name,
        site_sne: site_sne,
      },
    });
    return res.status(201).json(site);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//SUPPRIMER UN SITE (METHODE DELETE)
export const Deletesite = async (req: Request, res: Response) => {
  try {
    const id_site = req.params.id_site;
    const previous_site = await prisma.site.findFirst({
      where: {
        id_site: id_site,
      },
    });
    if (!previous_site)
      return res
        .status(404)
        .json({ message: `Pas de zone avec l'id ${id_site}` });
    await prisma.generator.deleteMany({
      where: {
        id_site: id_site,
      },
    });
    const site = await prisma.site.delete({
      where: {
        id_site: id_site,
      },
    });

    res.status(200).json(site);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
