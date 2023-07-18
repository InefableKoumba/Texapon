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
exports.Deletesite = exports.updatesite = exports.createsite = exports.siteSearch = exports.siteGetManyByZoneId = exports.siteGetOne = exports.siteGetAll = void 0;
//importation du model zone dans le controller zone
var client_1 = require("@prisma/client");
//nouvelle instance de prisma
var prisma = new client_1.PrismaClient();
//RECUPERER TOUS LES SITES (METHODE GET)
var siteGetAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sites, formatedData, _i, sites_1, site, zone, agent, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, prisma.site.findMany()];
            case 1:
                sites = _a.sent();
                formatedData = [];
                _i = 0, sites_1 = sites;
                _a.label = 2;
            case 2:
                if (!(_i < sites_1.length)) return [3 /*break*/, 7];
                site = sites_1[_i];
                return [4 /*yield*/, prisma.zone.findFirst({
                        where: {
                            zone_id: site.zone_id,
                        },
                    })];
            case 3:
                zone = _a.sent();
                agent = null;
                if (!site.matricule_agent) return [3 /*break*/, 5];
                return [4 /*yield*/, prisma.agent.findFirst({
                        where: {
                            matricule_agent: site.matricule_agent,
                        },
                    })];
            case 4:
                agent = _a.sent();
                _a.label = 5;
            case 5:
                formatedData.push(__assign(__assign({}, site), { zone: zone === null || zone === void 0 ? void 0 : zone.name_zone, owner: "".concat(agent === null || agent === void 0 ? void 0 : agent.nom, " ").concat(agent === null || agent === void 0 ? void 0 : agent.prenom) }));
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7: return [2 /*return*/, res.json(formatedData)];
            case 8:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_1 })];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.siteGetAll = siteGetAll;
//RECUPERER UN SITE EN PARTICULIER (METHODE GET by ID)
var siteGetOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_site, site, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id_site = req.params.id_site;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.site.findFirst({
                        where: {
                            id_site: id_site,
                        },
                    })];
            case 2:
                site = _a.sent();
                if (!site) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ message: "Pas de site avec l'id ".concat(id_site) })];
                }
                return [2 /*return*/, res.status(200).json(site)];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.siteGetOne = siteGetOne;
var siteGetManyByZoneId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var zone_id, sites, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                zone_id = req.params.zone_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.site.findMany({
                        where: {
                            zone_id: parseInt(zone_id),
                        },
                    })];
            case 2:
                sites = _a.sent();
                return [2 /*return*/, res.status(200).json(sites)];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.siteGetManyByZoneId = siteGetManyByZoneId;
//RECHERCHE PAR NOM DU SITE
var siteSearch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_site, name, site, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id_site = req.body.id_site;
                name = req.body.name;
                if (!id_site && !name)
                    return [2 /*return*/, res.status(404).json({ message: "Il manque le nom et l'id" })];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.site.findFirst({
                        where: {
                            id_site: id_site,
                            AND: {
                                name: name,
                            },
                        },
                    })];
            case 2:
                site = _a.sent();
                if (!site) {
                    if (name)
                        return [2 /*return*/, res
                                .status(404)
                                .json({ message: "Pas de site avec le nom ".concat(name) })];
                    if (id_site)
                        return [2 /*return*/, res
                                .status(404)
                                .json({ message: "Pas de site avec l'id ".concat(id_site) })];
                }
                return [2 /*return*/, res.status(200).json(site)];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_4 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.siteSearch = siteSearch;
//AJOUTER UN NOUVEAU SITE (METHODE POST)
var createsite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_site, name, site_sne, zone_id, matricule_agent, site, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(req.body);
                _a = req.body, id_site = _a.id_site, name = _a.name, site_sne = _a.site_sne, zone_id = _a.zone_id, matricule_agent = _a.matricule_agent;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.site.create({
                        data: {
                            id_site: id_site,
                            name: name,
                            site_sne: site_sne,
                            zone_id: zone_id,
                            matricule_agent: matricule_agent,
                        },
                    })];
            case 2:
                site = _b.sent();
                return [2 /*return*/, res.status(201).json(site)];
            case 3:
                error_5 = _b.sent();
                console.log(error_5);
                res.status(500).json({ message: error_5 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createsite = createsite;
//MODIFIER UN SITE (METHODE PUT)
var updatesite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_site, _a, name, site_sne, previous_site, site, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_site = req.params.id_site;
                _a = req.body, name = _a.name, site_sne = _a.site_sne;
                if (!id_site)
                    return [2 /*return*/, res
                            .status(401)
                            .json({ message: "Veuillez renseignez l'id du site" })];
                if (!name)
                    return [2 /*return*/, res
                            .status(401)
                            .json({ message: "Veuillez renseignez le nom du site" })];
                if (!site_sne)
                    return [2 /*return*/, res
                            .status(401)
                            .json({ message: "Veuillez renseignez le type de site" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.site.findFirst({
                        where: {
                            id_site: id_site,
                        },
                    })];
            case 2:
                previous_site = _b.sent();
                if (!previous_site)
                    return [2 /*return*/, res
                            .status(401)
                            .json({ message: "Le site avec l'id ... n'existe pas!" })];
                return [4 /*yield*/, prisma.site.update({
                        where: {
                            id_site: id_site,
                        },
                        data: {
                            id_site: id_site,
                            name: name,
                            site_sne: site_sne,
                        },
                    })];
            case 3:
                site = _b.sent();
                return [2 /*return*/, res.status(201).json(site)];
            case 4:
                error_6 = _b.sent();
                res.status(500).json({ message: error_6 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updatesite = updatesite;
//SUPPRIMER UN SITE (METHODE DELETE)
var Deletesite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_site, previous_site, site, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id_site = req.params.id_site;
                return [4 /*yield*/, prisma.site.findFirst({
                        where: {
                            id_site: id_site,
                        },
                    })];
            case 1:
                previous_site = _a.sent();
                if (!previous_site)
                    return [2 /*return*/, res
                            .status(404)
                            .json({ message: "Pas de zone avec l'id ".concat(id_site) })];
                return [4 /*yield*/, prisma.generator.deleteMany({
                        where: {
                            id_site: id_site,
                        },
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, prisma.site.delete({
                        where: {
                            id_site: id_site,
                        },
                    })];
            case 3:
                site = _a.sent();
                res.status(200).json(site);
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                res.status(500).json({ message: error_7 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.Deletesite = Deletesite;
//# sourceMappingURL=sitecontroller.js.map