"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatetraitementByAdmin = exports.updatetraitementByAgent = exports.createtraitement = exports.traitementGetAllByAgentId = exports.traitementGetAll = exports.traitementGetOneById = void 0;
//importation du model zone dans le controller zone
var client_1 = require("@prisma/client");
//nouvelle instance de prisma
var prisma = new client_1.PrismaClient();
//RECUPERER UN TRAITEMENT PARTICULIER PAR SON ID (METHODE GET by ID)
var traitementGetOneById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, traitement, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.traitement.findFirst({
                        where: {
                            id: parseInt(id),
                        },
                    })];
            case 2:
                traitement = _a.sent();
                if (!traitement) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Aucun traitement trouv\u00E9 avec ce num\u00E9ro de s\u00E9rie ".concat(id),
                        })];
                }
                return [2 /*return*/, res.status(200).json(traitement)];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.traitementGetOneById = traitementGetOneById;
//RECUPERER TOUS LES TRAITEMENTS
var traitementGetAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var traitements, data, _i, traitements_1, traitement, generator, agent, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, prisma.traitement.findMany()];
            case 1:
                traitements = _a.sent();
                data = [];
                _i = 0, traitements_1 = traitements;
                _a.label = 2;
            case 2:
                if (!(_i < traitements_1.length)) return [3 /*break*/, 6];
                traitement = traitements_1[_i];
                return [4 /*yield*/, prisma.generator.findFirst({
                        where: {
                            id: traitement.generator_id,
                        },
                    })];
            case 3:
                generator = _a.sent();
                return [4 /*yield*/, prisma.agent.findFirst({
                        where: {
                            id: traitement.agent_id,
                        },
                    })];
            case 4:
                agent = _a.sent();
                data.push(__assign(__assign({}, traitement), { model_generator: generator === null || generator === void 0 ? void 0 : generator.model_generator, name_agent: "".concat(agent === null || agent === void 0 ? void 0 : agent.nom, " ").concat(agent === null || agent === void 0 ? void 0 : agent.prenom), regime: generator === null || generator === void 0 ? void 0 : generator.regime_fonctionnement, serie: generator === null || generator === void 0 ? void 0 : generator.serial_number }));
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/, res.json(data)];
            case 7:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_2 })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.traitementGetAll = traitementGetAll;
var traitementGetAllByAgentId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var agent_id, traitements, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                agent_id = req.body.agent_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.traitement.findMany({
                        where: {
                            agent_id: parseInt(agent_id),
                        },
                        include: {
                            generator: {
                                include: {
                                    Site: {
                                        select: {
                                            name: true,
                                            id_site: true,
                                        },
                                    },
                                },
                            },
                        },
                    })];
            case 2:
                traitements = _a.sent();
                return [2 /*return*/, res.status(200).json(traitements)];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.traitementGetAllByAgentId = traitementGetAllByAgentId;
//ENREGISTRER UN TRAITEMENT
var createtraitement = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, generator_id, agent_id, traitement, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, generator_id = _a.generator_id, agent_id = _a.agent_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.traitement.create({
                        data: {
                            generator_id: generator_id,
                            agent_id: agent_id,
                        },
                    })];
            case 2:
                traitement = _b.sent();
                return [2 /*return*/, res.status(201).json(traitement)];
            case 3:
                error_4 = _b.sent();
                console.log(error_4);
                res.status(500).json({ message: error_4 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createtraitement = createtraitement;
//MODIFIER UN TRAITEMENT
var updatetraitementByAgent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, date_estimative_prochaine_vidange, traitement, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                date_estimative_prochaine_vidange = req.body.date_estimative_prochaine_vidange;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.traitement.update({
                        where: {
                            id: parseInt(id),
                        },
                        data: {
                            date_estimative_prochaine_vidange: date_estimative_prochaine_vidange,
                        },
                    })];
            case 2:
                traitement = _a.sent();
                return [2 /*return*/, res.status(201).json(traitement)];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                res.status(500).json({ message: error_5 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatetraitementByAgent = updatetraitementByAgent;
var updatetraitementByAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, agent_id, traitement, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                agent_id = req.body.agent_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.traitement.update({
                        where: {
                            id: parseInt(id),
                        },
                        data: {
                            agent_id: agent_id,
                        },
                    })];
            case 2:
                traitement = _a.sent();
                return [2 /*return*/, res.status(201).json(traitement)];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                res.status(500).json({ message: error_6 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatetraitementByAdmin = updatetraitementByAdmin;
//# sourceMappingURL=traitementcontroller.js.map