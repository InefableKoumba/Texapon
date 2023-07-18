"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vidangerouter = void 0;
var express_1 = __importDefault(require("express"));
exports.vidangerouter = express_1.default.Router();
var vidangecontroller_1 = require("../controllers/vidangecontroller");
exports.vidangerouter.post("/treatment/:id", vidangecontroller_1.createVidange);
exports.vidangerouter.post("/overview/treatment/:id", vidangecontroller_1.getOverview);
exports.vidangerouter.get("/", vidangecontroller_1.vidangeGetAll);
exports.vidangerouter.get("/byMonth/:month/:year", vidangecontroller_1.vidangeGetAllByMonth);
exports.vidangerouter.get("/treatment/:id", vidangecontroller_1.vidangeGetAllByTreatmentId);
exports.vidangerouter.get("/:id", vidangecontroller_1.vidangeGetOne);
//# sourceMappingURL=vidangerouter.js.map