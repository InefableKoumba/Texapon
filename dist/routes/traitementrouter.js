"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traitementrouter = void 0;
var express_1 = __importDefault(require("express"));
exports.traitementrouter = express_1.default.Router();
var traitementcontroller_1 = require("../controllers/traitementcontroller");
exports.traitementrouter.post("/", traitementcontroller_1.createtraitement);
exports.traitementrouter.get("/:id", traitementcontroller_1.traitementGetOneById);
exports.traitementrouter.get("/", traitementcontroller_1.traitementGetAll);
exports.traitementrouter.post("/agent", traitementcontroller_1.traitementGetAllByAgentId);
exports.traitementrouter.put("/updateByAgent/:id", traitementcontroller_1.updatetraitementByAgent);
exports.traitementrouter.put("/updateByAdmin/:id", traitementcontroller_1.updatetraitementByAgent);
//# sourceMappingURL=traitementrouter.js.map