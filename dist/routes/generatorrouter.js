"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatorrouter = void 0;
var express_1 = __importDefault(require("express"));
exports.generatorrouter = express_1.default.Router();
var generatorcontroller_1 = require("../controllers/generatorcontroller");
exports.generatorrouter.post("/", generatorcontroller_1.creategenerator);
exports.generatorrouter.get("/", generatorcontroller_1.generatorGetAll);
exports.generatorrouter.get("/:serial_number", generatorcontroller_1.generatorGetOne);
exports.generatorrouter.delete("/:serial_number", generatorcontroller_1.Deletegenerator);
exports.generatorrouter.put("/:serial_number", generatorcontroller_1.updategenerator);
//# sourceMappingURL=generatorrouter.js.map