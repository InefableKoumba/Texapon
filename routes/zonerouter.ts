import express from "express";
export const zonerouter = express.Router();
import {
  updateZone,
  createZone,
  DeleteZone,
  zoneGetOne,
  zoneGetAll,
} from "../controllers/zonecontroller";

zonerouter.post("/", createZone);
zonerouter.get("/", zoneGetAll);
zonerouter.get("/:zone_id", zoneGetOne);
zonerouter.delete("/:zone_id", DeleteZone);
zonerouter.put("/:zone_id", updateZone);
