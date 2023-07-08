import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
//nouvelle instance de prisma
const prisma = new PrismaClient();

//RECUPERER TOUS LES AGENTS (METHODE GET)
export const agentGetAll = async (req: Request, res: Response) => {
  try {
    const agents = await prisma.agent.findMany();
    return res.json(agents);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//RECUPERER UN AGENT EN PARTICULIER (METHODE GET by ID)
export const agentGetOne = async (req: Request, res: Response) => {
  const matricule_agent = req.params.matricule_agent;

  try {
    const agent = await prisma.agent.findFirst({
      where: {
        matricule_agent: matricule_agent,
      },
    });
    if (!agent) {
      return res.status(404).json({
        message: `Aucun agent trouvé avec ce numéro matricule ${matricule_agent}`,
      });
    }
    return res.status(200).json(agent);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//RECHERCHE PAR NOM DE L'AGENT
export const agentnameSearch = async (req: Request, res: Response) => {
  const matricule_agent = req.body.matricule_agent;
  const nom = req.body.nom;
  if (!matricule_agent && !nom)
    return res
      .status(404)
      .json({ message: "Il manque le nom ou le matricule" });
  try {
    const agent = await prisma.agent.findFirst({
      where: {
        nom: nom,
        AND: {
          matricule_agent: matricule_agent,
        },
      },
    });
    if (!agent) {
      if (nom)
        return res
          .status(404)
          .json({ message: `Aucun agent trouvé avec ce nom ${nom}` });
      if (matricule_agent)
        return res.status(404).json({
          message: `Aucun agent trouvé avec ce matricule ${matricule_agent}`,
        });
    }
    return res.status(200).json(agent);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//AJOUTER UN NOUVEL AGENT (METHODE POST)
export const createagent = async (req: Request, res: Response) => {
  console.log(req.body);
  const { matricule_agent, nom, prenom, poste, service, username, password } =
    req.body;
  try {
    const existingagent = await prisma.agent.findFirst({
      where: {
        matricule_agent: matricule_agent,
      },
    });
    if (existingagent) {
      return res.status(401).json({
        message: "Ce matricule existe déjà",
      });
    }
    const agent = await prisma.agent.create({
      data: {
        matricule_agent: matricule_agent,
        nom: nom,
        prenom: prenom,
        poste: poste,
        service: service,
        username: username,
        password: password,
      },
    });
    return res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//MODIFIER UN AGENT (METHODE PUT)
export const updateagent = async (req: Request, res: Response) => {
  const matricule_agent = req.params.matricule_agent;
  const { nom, prenom, poste, service } = req.body;
  if (!matricule_agent)
    return res.status(401).json({
      message: "Veuillez renseignez le matricule de l'agent",
    });
  try {
    const previous_agent = await prisma.agent.findFirst({
      where: {
        matricule_agent: matricule_agent,
      },
    });
    if (!previous_agent)
      return res.status(401).json({
        message: "L'agent ayant ce matricule n'existe pas!",
      });
    const agent = await prisma.agent.update({
      where: {
        matricule_agent: matricule_agent,
      },
      data: {
        matricule_agent: matricule_agent,
        nom: nom,
        prenom: prenom,
        poste: poste,
        service: service,
      },
    });
    return res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//SUPPRIMER UN GENERATEUR (METHODE DELETE)
export const deleteagent = async (req: Request, res: Response) => {
  try {
    const matricule_agent = req.params.matricule_agent;
    const previous_agent = await prisma.agent.findFirst({
      where: {
        matricule_agent: matricule_agent,
      },
    });
    if (!previous_agent)
      return res.status(404).json({
        message: `Aucun agent trouvé avec ce matricule ${matricule_agent}`,
      });
    const agent = await prisma.agent.delete({
      where: {
        matricule_agent: matricule_agent,
      },
    });

    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
