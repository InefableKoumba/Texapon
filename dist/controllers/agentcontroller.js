"use strict";
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
exports.deleteagent = exports.updateagent = exports.createagent = exports.agentnameSearch = exports.agentGetOne = exports.agentGetAll = void 0;
var client_1 = require("@prisma/client");
//nouvelle instance de prisma
var prisma = new client_1.PrismaClient();
//RECUPERER TOUS LES AGENTS (METHODE GET)
var agentGetAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var agents, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.agent.findMany()];
            case 1:
                agents = _a.sent();
                return [2 /*return*/, res.json(agents)];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.agentGetAll = agentGetAll;
//RECUPERER UN AGENT EN PARTICULIER (METHODE GET by ID)
var agentGetOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var matricule_agent, agent, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                matricule_agent = req.params.matricule_agent;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.agent.findFirst({
                        where: {
                            matricule_agent: matricule_agent,
                        },
                    })];
            case 2:
                agent = _a.sent();
                if (!agent) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Aucun agent trouv\u00E9 avec ce num\u00E9ro matricule ".concat(matricule_agent),
                        })];
                }
                return [2 /*return*/, res.status(200).json(agent)];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.agentGetOne = agentGetOne;
//RECHERCHE PAR NOM DE L'AGENT
var agentnameSearch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var matricule_agent, nom, agent, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                matricule_agent = req.body.matricule_agent;
                nom = req.body.nom;
                if (!matricule_agent && !nom)
                    return [2 /*return*/, res
                            .status(404)
                            .json({ message: "Il manque le nom ou le matricule" })];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.agent.findFirst({
                        where: {
                            nom: nom,
                            AND: {
                                matricule_agent: matricule_agent,
                            },
                        },
                    })];
            case 2:
                agent = _a.sent();
                if (!agent) {
                    if (nom)
                        return [2 /*return*/, res
                                .status(404)
                                .json({ message: "Aucun agent trouv\u00E9 avec ce nom ".concat(nom) })];
                    if (matricule_agent)
                        return [2 /*return*/, res.status(404).json({
                                message: "Aucun agent trouv\u00E9 avec ce matricule ".concat(matricule_agent),
                            })];
                }
                return [2 /*return*/, res.status(200).json(agent)];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.agentnameSearch = agentnameSearch;
//AJOUTER UN NOUVEL AGENT (METHODE POST)
var createagent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, matricule_agent, nom, prenom, poste, service, username, password, existingagent, agent, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(req.body);
                _a = req.body, matricule_agent = _a.matricule_agent, nom = _a.nom, prenom = _a.prenom, poste = _a.poste, service = _a.service, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.agent.findFirst({
                        where: {
                            matricule_agent: matricule_agent,
                        },
                    })];
            case 2:
                existingagent = _b.sent();
                if (existingagent) {
                    return [2 /*return*/, res.status(401).json({
                            message: "Ce matricule existe déjà",
                        })];
                }
                return [4 /*yield*/, prisma.agent.create({
                        data: {
                            matricule_agent: matricule_agent,
                            nom: nom,
                            prenom: prenom,
                            poste: poste,
                            service: service,
                            username: username,
                            password: password,
                        },
                    })];
            case 3:
                agent = _b.sent();
                return [2 /*return*/, res.status(201).json(agent)];
            case 4:
                error_4 = _b.sent();
                res.status(500).json({ message: error_4 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createagent = createagent;
//MODIFIER UN AGENT (METHODE PUT)
var updateagent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var matricule_agent, _a, nom, prenom, poste, service, previous_agent, agent, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                matricule_agent = req.params.matricule_agent;
                _a = req.body, nom = _a.nom, prenom = _a.prenom, poste = _a.poste, service = _a.service;
                if (!matricule_agent)
                    return [2 /*return*/, res.status(401).json({
                            message: "Veuillez renseignez le matricule de l'agent",
                        })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.agent.findFirst({
                        where: {
                            matricule_agent: matricule_agent,
                        },
                    })];
            case 2:
                previous_agent = _b.sent();
                if (!previous_agent)
                    return [2 /*return*/, res.status(401).json({
                            message: "L'agent ayant ce matricule n'existe pas!",
                        })];
                return [4 /*yield*/, prisma.agent.update({
                        where: {
                            matricule_agent: matricule_agent,
                        },
                        data: {
                            matricule_agent: matricule_agent,
                            nom: nom,
                            prenom: prenom,
                            poste: poste,
                            service: service,
                        },
                    })];
            case 3:
                agent = _b.sent();
                return [2 /*return*/, res.status(201).json(agent)];
            case 4:
                error_5 = _b.sent();
                res.status(500).json({ message: error_5 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateagent = updateagent;
//SUPPRIMER UN GENERATEUR (METHODE DELETE)
var deleteagent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var matricule_agent, previous_agent, agent, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                matricule_agent = req.params.matricule_agent;
                return [4 /*yield*/, prisma.agent.findFirst({
                        where: {
                            matricule_agent: matricule_agent,
                        },
                    })];
            case 1:
                previous_agent = _a.sent();
                if (!previous_agent)
                    return [2 /*return*/, res.status(404).json({
                            message: "Aucun agent trouv\u00E9 avec ce matricule ".concat(matricule_agent),
                        })];
                return [4 /*yield*/, prisma.agent.delete({
                        where: {
                            matricule_agent: matricule_agent,
                        },
                    })];
            case 2:
                agent = _a.sent();
                res.status(200).json(agent);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.status(500).json({ message: error_6 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteagent = deleteagent;
//# sourceMappingURL=agentcontroller.js.map