import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

//nouvelle instance de prisma
const prisma = new PrismaClient();

//GERE LES AUTHENTIFICATIONS
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({
      message: "veuillez saisir l'username et le mot de passe",
    });
  }

  const existingUser = await prisma.agent.findFirst({
    where: {
      username,
    },
  });
  if (!existingUser) {
    return res.status(404).json({
      message: "Cet utilisateur n'existe pas",
    });
  }
  if (existingUser.password !== password) {
    return res.status(401).json({
      message: " Mauvais mot de passe",
    });
  }
  if (!process.env.JWT_SECRET_KEY) {
    return res.status(500).json({
      message: "Une erreur est survenue.",
    });
  }
  const { id, nom, prenom, poste, matricule_agent } = existingUser;
  jwt.sign(
    { userId: existingUser.id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "50d" },
    function (err, token) {
      if (err) {
        throw Error("Failed to create a token: " + err);
      } else {
        return res.status(201).json({
          token,
          id,
          nom,
          prenom,
          poste,
          matricule_agent,
        });
      }
    }
  );
};
