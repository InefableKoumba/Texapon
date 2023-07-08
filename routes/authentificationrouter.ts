import express from "express";
export const authentificationrouter = express.Router();
import { login } from "../controllers/authentificationcontroller";

authentificationrouter.post("/login", login);
