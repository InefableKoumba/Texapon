"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siterouter = void 0;
var express_1 = __importDefault(require("express"));
exports.siterouter = express_1.default.Router();
var sitecontroller_1 = require("../controllers/sitecontroller");
exports.siterouter.post("/", sitecontroller_1.createsite);
exports.siterouter.get("/", sitecontroller_1.siteGetAll);
exports.siterouter.get("/:id_site", sitecontroller_1.siteGetOne);
exports.siterouter.get("/zone/:zone_id", sitecontroller_1.siteGetManyByZoneId);
exports.siterouter.post("/search", sitecontroller_1.siteSearch);
exports.siterouter.delete("/:id_site", sitecontroller_1.Deletesite);
exports.siterouter.put("/:id_site", sitecontroller_1.updatesite);
//# sourceMappingURL=siterouter.js.map