import express from "express";
export const generatorrouter = express.Router();
import {
  updategenerator,
  creategenerator,
  Deletegenerator,
  generatorGetOne,
  generatorGetAll,
} from "../controllers/generatorcontroller";

generatorrouter.post("/", creategenerator);
generatorrouter.get("/", generatorGetAll);
generatorrouter.get("/:serial_number", generatorGetOne);
generatorrouter.delete("/:serial_number", Deletegenerator);
generatorrouter.put("/:serial_number", updategenerator);
