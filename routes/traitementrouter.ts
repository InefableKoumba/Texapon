import express from "express";
export const traitementrouter = express.Router();
import {
  traitementGetOneById,
  createtraitement,
  updatetraitementByAdmin,
  updatetraitementByAgent,
  traitementGetAllByAgentId,
  traitementGetAll,
} from "../controllers/traitementcontroller";

traitementrouter.post("/", createtraitement);
traitementrouter.get("/:id", traitementGetOneById);
traitementrouter.get("/", traitementGetAll);
traitementrouter.post("/agent", traitementGetAllByAgentId);
traitementrouter.put("/updateByAgent/:id", updatetraitementByAgent);
traitementrouter.put("/updateByAdmin/:id", updatetraitementByAgent);
