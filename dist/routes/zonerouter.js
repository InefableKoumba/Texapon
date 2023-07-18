"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zonerouter = void 0;
var express_1 = __importDefault(require("express"));
exports.zonerouter = express_1.default.Router();
var zonecontroller_1 = require("../controllers/zonecontroller");
exports.zonerouter.post("/", zonecontroller_1.createZone);
exports.zonerouter.get("/", zonecontroller_1.zoneGetAll);
exports.zonerouter.get("/:zone_id", zonecontroller_1.zoneGetOne);
exports.zonerouter.delete("/:zone_id", zonecontroller_1.DeleteZone);
exports.zonerouter.put("/:zone_id", zonecontroller_1.updateZone);
//# sourceMappingURL=zonerouter.js.map