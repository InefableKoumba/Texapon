import express from "express";
export const vidangerouter = express.Router();
import {
  createVidange,
  vidangeGetAll,
  vidangeGetAllByTreatmentId,
  vidangeGetOne,
  getOverview,
  vidangeGetAllByMonth,
} from "../controllers/vidangecontroller";

vidangerouter.post("/treatment/:id", createVidange);
vidangerouter.post("/overview/treatment/:id", getOverview);
vidangerouter.get("/", vidangeGetAll);
vidangerouter.get("/byMonth/:month/:year", vidangeGetAllByMonth);
vidangerouter.get("/treatment/:id", vidangeGetAllByTreatmentId);
vidangerouter.get("/:id", vidangeGetOne);
