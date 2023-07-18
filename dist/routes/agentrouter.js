"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentrouter = void 0;
var express_1 = __importDefault(require("express"));
exports.agentrouter = express_1.default.Router();
var agentcontroller_1 = require("../controllers/agentcontroller");
exports.agentrouter.post("/", agentcontroller_1.createagent);
exports.agentrouter.get("/", agentcontroller_1.agentGetAll);
exports.agentrouter.get("/:matricule_agent", agentcontroller_1.agentGetOne);
exports.agentrouter.post("/search", agentcontroller_1.agentnameSearch);
exports.agentrouter.delete("/:matricule_agent", agentcontroller_1.deleteagent);
exports.agentrouter.put("/:matricule_agent", agentcontroller_1.updateagent);
//# sourceMappingURL=agentrouter.js.map