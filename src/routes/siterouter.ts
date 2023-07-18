import express from "express";
export const siterouter = express.Router();
import {
  updatesite,
  createsite,
  Deletesite,
  siteGetOne,
  siteSearch,
  siteGetAll,
  siteGetManyByZoneId,
} from "../controllers/sitecontroller";

siterouter.post("/", createsite);
siterouter.get("/", siteGetAll);
siterouter.get("/:id_site", siteGetOne);
siterouter.get("/zone/:zone_id", siteGetManyByZoneId);
siterouter.post("/search", siteSearch);
siterouter.delete("/:id_site", Deletesite);
siterouter.put("/:id_site", updatesite);
