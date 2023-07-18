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
exports.Deletegenerator = exports.updategenerator = exports.creategenerator = exports.generatorGetOne = exports.generatorGetAll = void 0;
//importation du model zone dans le controller zone
var client_1 = require("@prisma/client");
//nouvelle instance de prisma
var prisma = new client_1.PrismaClient();
//RECUPERER TOUS LES GENERATEURS (METHODE GET)
var generatorGetAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var generators, data, _i, generators_1, generator, site, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, prisma.generator.findMany()];
            case 1:
                generators = _a.sent();
                data = [];
                _i = 0, generators_1 = generators;
                _a.label = 2;
            case 2:
                if (!(_i < generators_1.length)) return [3 /*break*/, 5];
                generator = generators_1[_i];
                return [4 /*yield*/, prisma.site.findFirst({
                        where: {
                            id_site: generator.id_site,
                        },
                    })];
            case 3:
                site = _a.sent();
                data.push(__assign(__assign({}, generator), { site_name: site === null || site === void 0 ? void 0 : site.name }));
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, res.json(data)];
            case 6:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_1 })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.generatorGetAll = generatorGetAll;
//RECUPERER UN GENERATEUR EN PARTICULIER (METHODE GET by ID)
var generatorGetOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serial_number, generator, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                serial_number = req.params.serial_number;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.generator.findFirst({
                        where: {
                            serial_number: serial_number,
                        },
                    })];
            case 2:
                generator = _a.sent();
                if (!generator) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Pas de generateur avec ce num\u00E9ro de s\u00E9rie ".concat(serial_number),
                        })];
                }
                return [2 /*return*/, res.status(200).json(generator)];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.generatorGetOne = generatorGetOne;
//AJOUTER UN NOUVEAU GENERATEUR (METHODE POST)
var creategenerator = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, serial_number, model_generator, regime_fonctionnement, capacity, id_site, generator, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, serial_number = _a.serial_number, model_generator = _a.model_generator, regime_fonctionnement = _a.regime_fonctionnement, capacity = _a.capacity, id_site = _a.id_site;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.generator.create({
                        data: {
                            serial_number: serial_number,
                            model_generator: model_generator,
                            regime_fonctionnement: regime_fonctionnement,
                            capacity: capacity,
                            id_site: id_site,
                        },
                    })];
            case 2:
                generator = _b.sent();
                return [2 /*return*/, res.status(201).json(generator)];
            case 3:
                error_3 = _b.sent();
                res.status(500).json({ message: error_3 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.creategenerator = creategenerator;
//MODIFIER UN GENERATEUR (METHODE PUT)
var updategenerator = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serial_number, _a, model_generator, regime_fonctionnement, capacity, previous_generator, generator, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                serial_number = req.params.serial_number;
                _a = req.body, model_generator = _a.model_generator, regime_fonctionnement = _a.regime_fonctionnement, capacity = _a.capacity;
                if (!serial_number)
                    return [2 /*return*/, res.status(401).json({
                            message: "Veuillez renseignez le numéro de série du générateur",
                        })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.generator.findFirst({
                        where: {
                            serial_number: serial_number,
                        },
                    })];
            case 2:
                previous_generator = _b.sent();
                if (!previous_generator)
                    return [2 /*return*/, res.status(401).json({
                            message: "Le générateur avec ce numéro de série n'existe pas!",
                        })];
                return [4 /*yield*/, prisma.generator.update({
                        where: {
                            serial_number: serial_number,
                        },
                        data: {
                            serial_number: serial_number,
                            model_generator: model_generator,
                            regime_fonctionnement: regime_fonctionnement,
                            capacity: capacity,
                        },
                    })];
            case 3:
                generator = _b.sent();
                return [2 /*return*/, res.status(201).json(generator)];
            case 4:
                error_4 = _b.sent();
                res.status(500).json({ message: error_4 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updategenerator = updategenerator;
//SUPPRIMER UN GENERATEUR (METHODE DELETE)
var Deletegenerator = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serial_number, previous_generator, generator, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                serial_number = req.params.serial_number;
                return [4 /*yield*/, prisma.generator.findFirst({
                        where: {
                            serial_number: serial_number,
                        },
                    })];
            case 1:
                previous_generator = _a.sent();
                if (!previous_generator)
                    return [2 /*return*/, res.status(404).json({
                            message: "Pas de g\u00E9n\u00E9rateur avec ce num\u00E9ro de s\u00E9rie ".concat(serial_number),
                        })];
                return [4 /*yield*/, prisma.generator.delete({
                        where: {
                            serial_number: serial_number,
                        },
                    })];
            case 2:
                generator = _a.sent();
                res.status(200).json(generator);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(500).json({ message: error_5 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.Deletegenerator = Deletegenerator;
//# sourceMappingURL=generatorcontroller.js.map