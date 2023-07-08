// importation express et prisma dans notre serveur
//express
import express from "express";
var cors = require("cors");
//prisma
import { PrismaClient, Site, Zone } from "@prisma/client";
// importation route
import { zonerouter } from "./routes/zonerouter";
import { siterouter } from "./routes/siterouter";
import { generatorrouter } from "./routes/generatorrouter";
import { agentrouter } from "./routes/agentrouter";
import { traitementrouter } from "./routes/traitementrouter";
import { authentificationrouter } from "./routes/authentificationrouter";
import { verifyToken } from "./middlewares/authentification";
import { vidangerouter } from "./routes/vidangerouter";

//nouvelle instance de prisma
const prisma = new PrismaClient();
//fonction qui permet de démarrer notre serveur associés à prisma
async function main() {
  // ... à partir de là, nous pouvons commencer à envoyer des requêtes prisma
  //à notre base de données
  //toujours en appelant express
  const app = express();
  app.use(cors());
  app.use("/api/v1/", (req, res, next) => {
    verifyToken(req, res, next);
  });
  // Parse JSON bodies for this app. Make sure you put
  // `app.use(express.json())` **before** your route handlers!
  app.use(express.json());

  //port d'ecoute du serveur
  const port = 3000;
  //routes
  app.use("/api/v1/zones", zonerouter);
  app.use("/api/v1/sites", siterouter);
  app.use("/api/v1/generators", generatorrouter);
  app.use("/api/v1/agents", agentrouter);
  app.use("/api/v1/traitements", traitementrouter);
  app.use("/api/authentification", authentificationrouter);
  app.use("/api/v1/vidanges", vidangerouter);
  //route pour créer une vidange
  app.get("/api/v1/get_data_to_create_treatment", async function (req, res) {
    const sites = await prisma.site.findMany();
    const agents = await prisma.agent.findMany();
    const generators = await prisma.generator.findMany();
    const zones = await prisma.zone.findMany();

    const data: any = [];

    for (const site of sites) {
      const id_site = site.id_site;
      const site_name = site.name;
      let zone_name = null;
      let regime = null;
      let agent_full_name = null;
      let agent_id = null;
      let generator_id = null;

      for (const zone of zones) {
        if (zone.zone_id == site.zone_id) {
          zone_name = zone.name_zone;
          break;
        }
      }
      for (const generator of generators) {
        if (generator.id_site == site.id_site) {
          regime = generator.regime_fonctionnement;
          generator_id = generator.id;
          break;
        }
      }
      for (const agent of agents) {
        if (agent.matricule_agent == site.matricule_agent) {
          agent_full_name = agent.nom + " " + agent.prenom;
          agent_id = agent.id;
          break;
        }
      }
      data.push({
        id_site,
        agent_id,
        generator_id,
        site_name,
        zone_name,
        regime,
        agent_full_name,
      });
    }
    return res.json(data);
  });
  //route pour créer un site en affichant les zones et les agents
  app.get("/api/v1/get_data_to_create_site", async function (req, res) {
    const agents = await prisma.agent.findMany({
      where: {
        poste: "FIELDS_ENGINEER" || "FIELDS_SUPERVISOR",
      },
    });
    const zones = await prisma.zone.findMany();
    const data: {
      zones: Zone[];
      agents: any[];
    } = {
      zones: [],
      agents: [],
    };

    zones.forEach((zone) => {
      data.zones.push({
        zone_id: zone.zone_id,
        name_zone: zone.name_zone,
      });
    });

    agents.forEach((agent) => {
      data.agents.push({
        matricule_agent: agent.matricule_agent,
        nom: agent.nom,
        prenom: agent.prenom,
      });
    });

    return res.json(data);
  });
  app.get("/api/v1/get_user_dashboard_data/:agent_id", async function (req, res) {
    const agent_id = req.params.agent_id
    const vidanges = await prisma.vidange.findMany({
      where: {
        traitement: {
          agent_id: parseInt(agent_id)
        }
      }
    });
    return res.status(200).json(vidanges);

  });
  //route pour créer un site en affichant les zones et les agents
  app.get("/api/v1/get_data_to_create_site", async function (req, res) {
    const agents = await prisma.agent.findMany({
      where: {
        poste: "FIELDS_ENGINEER" || "FIELDS_SUPERVISOR",
      },
    });
    const zones = await prisma.zone.findMany();
    const data: {
      zones: Zone[];
      agents: any[];
    } = {
      zones: [],
      agents: [],
    };

    zones.forEach((zone) => {
      data.zones.push({
        zone_id: zone.zone_id,
        name_zone: zone.name_zone,
      });
    });

    agents.forEach((agent) => {
      data.agents.push({
        matricule_agent: agent.matricule_agent,
        nom: agent.nom,
        prenom: agent.prenom,
      });
    });

    return res.json(data);
  });
  //route pour créer un generateur
  app.get("/api/v1/get_data_to_create_generator", async function (req, res) {
    const sites = await prisma.site.findMany();
    const data: {
      sites: Site[];
    } = {
      sites: [],
    };

    sites.forEach((site) => {
      data.sites.push({
        id_site: site.id_site,
        name: site.name,
        id: 0,
        matricule_agent: null,
        site_sne: false,
        zone_id: 0,
      });
    });

    return res.json(data);
  });
  //port d'ecoute du serveur
  app.listen(port, () => {
    //message de confirmation de l'ecoute du serveur
    console.log(`Server écoute actuellement au port ${port}`);
  });
}
//appel de notre fonction de Démarrage
main()
  //instance de démarrage
  .then(async () => {
    await prisma.$disconnect();
  })
  //capture en cas d'érreurs
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
