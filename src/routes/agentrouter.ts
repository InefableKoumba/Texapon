import express from "express";
export const agentrouter = express.Router();
import {
  agentGetAll,
  agentGetOne,
  agentnameSearch,
  createagent,
  updateagent,
  deleteagent,
} from "../controllers/agentcontroller";

agentrouter.post("/", createagent);
agentrouter.get("/", agentGetAll);
agentrouter.get("/:matricule_agent", agentGetOne);
agentrouter.post("/search", agentnameSearch);
agentrouter.delete("/:matricule_agent", deleteagent);
agentrouter.put("/:matricule_agent", updateagent);
