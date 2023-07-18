"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentificationrouter = void 0;
var express_1 = __importDefault(require("express"));
exports.authentificationrouter = express_1.default.Router();
var authentificationcontroller_1 = require("../controllers/authentificationcontroller");
exports.authentificationrouter.post("/login", authentificationcontroller_1.login);
//# sourceMappingURL=authentificationrouter.js.map