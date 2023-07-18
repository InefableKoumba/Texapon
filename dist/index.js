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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importation express et prisma dans notre serveur
//express
var express_1 = __importDefault(require("express"));
var cors = require("cors");
//prisma
var client_1 = require("@prisma/client");
// importation route
var zonerouter_1 = require("./routes/zonerouter");
var siterouter_1 = require("./routes/siterouter");
var generatorrouter_1 = require("./routes/generatorrouter");
var agentrouter_1 = require("./routes/agentrouter");
var traitementrouter_1 = require("./routes/traitementrouter");
var authentificationrouter_1 = require("./routes/authentificationrouter");
var authentification_1 = require("./middlewares/authentification");
var vidangerouter_1 = require("./routes/vidangerouter");
//nouvelle instance de prisma
var prisma = new client_1.PrismaClient();
//fonction qui permet de démarrer notre serveur associés à prisma
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var app, port;
        return __generator(this, function (_a) {
            app = (0, express_1.default)();
            app.use(cors());
            app.use("/api/v1/", function (req, res, next) {
                (0, authentification_1.verifyToken)(req, res, next);
            });
            // Parse JSON bodies for this app. Make sure you put
            // `app.use(express.json())` **before** your route handlers!
            app.use(express_1.default.json());
            port = 3000;
            //routes
            app.use("/api/v1/zones", zonerouter_1.zonerouter);
            app.use("/api/v1/sites", siterouter_1.siterouter);
            app.use("/api/v1/generators", generatorrouter_1.generatorrouter);
            app.use("/api/v1/agents", agentrouter_1.agentrouter);
            app.use("/api/v1/traitements", traitementrouter_1.traitementrouter);
            app.use("/api/authentification", authentificationrouter_1.authentificationrouter);
            app.use("/api/v1/vidanges", vidangerouter_1.vidangerouter);
            //route pour créer une vidange
            app.get("/api/v1/get_data_to_create_treatment", function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var sites, agents, generators, zones, data, _i, sites_1, site, id_site, site_name, zone_name, regime, agent_full_name, agent_id, generator_id, _a, zones_1, zone, _b, generators_1, generator, _c, agents_1, agent;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, prisma.site.findMany()];
                            case 1:
                                sites = _d.sent();
                                return [4 /*yield*/, prisma.agent.findMany()];
                            case 2:
                                agents = _d.sent();
                                return [4 /*yield*/, prisma.generator.findMany()];
                            case 3:
                                generators = _d.sent();
                                return [4 /*yield*/, prisma.zone.findMany()];
                            case 4:
                                zones = _d.sent();
                                data = [];
                                for (_i = 0, sites_1 = sites; _i < sites_1.length; _i++) {
                                    site = sites_1[_i];
                                    id_site = site.id_site;
                                    site_name = site.name;
                                    zone_name = null;
                                    regime = null;
                                    agent_full_name = null;
                                    agent_id = null;
                                    generator_id = null;
                                    for (_a = 0, zones_1 = zones; _a < zones_1.length; _a++) {
                                        zone = zones_1[_a];
                                        if (zone.zone_id == site.zone_id) {
                                            zone_name = zone.name_zone;
                                            break;
                                        }
                                    }
                                    for (_b = 0, generators_1 = generators; _b < generators_1.length; _b++) {
                                        generator = generators_1[_b];
                                        if (generator.id_site == site.id_site) {
                                            regime = generator.regime_fonctionnement;
                                            generator_id = generator.id;
                                            break;
                                        }
                                    }
                                    for (_c = 0, agents_1 = agents; _c < agents_1.length; _c++) {
                                        agent = agents_1[_c];
                                        if (agent.matricule_agent == site.matricule_agent) {
                                            agent_full_name = agent.nom + " " + agent.prenom;
                                            agent_id = agent.id;
                                            break;
                                        }
                                    }
                                    data.push({
                                        id_site: id_site,
                                        agent_id: agent_id,
                                        generator_id: generator_id,
                                        site_name: site_name,
                                        zone_name: zone_name,
                                        regime: regime,
                                        agent_full_name: agent_full_name,
                                    });
                                }
                                return [2 /*return*/, res.json(data)];
                        }
                    });
                });
            });
            //route pour créer un site en affichant les zones et les agents
            app.get("/api/v1/get_data_to_create_site", function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var agents, zones, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma.agent.findMany({
                                    where: {
                                        poste: "FIELDS_ENGINEER" || "FIELDS_SUPERVISOR",
                                    },
                                })];
                            case 1:
                                agents = _a.sent();
                                return [4 /*yield*/, prisma.zone.findMany()];
                            case 2:
                                zones = _a.sent();
                                data = {
                                    zones: [],
                                    agents: [],
                                };
                                zones.forEach(function (zone) {
                                    data.zones.push({
                                        zone_id: zone.zone_id,
                                        name_zone: zone.name_zone,
                                    });
                                });
                                agents.forEach(function (agent) {
                                    data.agents.push({
                                        matricule_agent: agent.matricule_agent,
                                        nom: agent.nom,
                                        prenom: agent.prenom,
                                    });
                                });
                                return [2 /*return*/, res.json(data)];
                        }
                    });
                });
            });
            app.get("/api/v1/get_user_dashboard_data/:agent_id", function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var agent_id, vidanges;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                agent_id = req.params.agent_id;
                                return [4 /*yield*/, prisma.vidange.findMany({
                                        where: {
                                            traitement: {
                                                agent_id: parseInt(agent_id)
                                            }
                                        }
                                    })];
                            case 1:
                                vidanges = _a.sent();
                                return [2 /*return*/, res.status(200).json(vidanges)];
                        }
                    });
                });
            });
            //route pour créer un site en affichant les zones et les agents
            app.get("/api/v1/get_data_to_create_site", function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var agents, zones, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma.agent.findMany({
                                    where: {
                                        poste: "FIELDS_ENGINEER" || "FIELDS_SUPERVISOR",
                                    },
                                })];
                            case 1:
                                agents = _a.sent();
                                return [4 /*yield*/, prisma.zone.findMany()];
                            case 2:
                                zones = _a.sent();
                                data = {
                                    zones: [],
                                    agents: [],
                                };
                                zones.forEach(function (zone) {
                                    data.zones.push({
                                        zone_id: zone.zone_id,
                                        name_zone: zone.name_zone,
                                    });
                                });
                                agents.forEach(function (agent) {
                                    data.agents.push({
                                        matricule_agent: agent.matricule_agent,
                                        nom: agent.nom,
                                        prenom: agent.prenom,
                                    });
                                });
                                return [2 /*return*/, res.json(data)];
                        }
                    });
                });
            });
            //route pour créer un generateur
            app.get("/api/v1/get_data_to_create_generator", function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var sites, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma.site.findMany()];
                            case 1:
                                sites = _a.sent();
                                data = {
                                    sites: [],
                                };
                                sites.forEach(function (site) {
                                    data.sites.push({
                                        id_site: site.id_site,
                                        name: site.name,
                                        id: 0,
                                        matricule_agent: null,
                                        site_sne: false,
                                        zone_id: 0,
                                    });
                                });
                                return [2 /*return*/, res.json(data)];
                        }
                    });
                });
            });
            //port d'ecoute du serveur
            app.listen(port, function () {
                //message de confirmation de l'ecoute du serveur
                console.log("Server \u00E9coute actuellement au port ".concat(port));
            });
            return [2 /*return*/];
        });
    });
}
//appel de notre fonction de Démarrage
main()
    //instance de démarrage
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    //capture en cas d'érreurs
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.js.map