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
exports.vidangeGetOne = exports.vidangeGetAllByMonth = exports.vidangeGetAll = exports.vidangeGetAllByTreatmentId = exports.getOverview = exports.createVidange = void 0;
//importation du model zone dans le controller zone
var client_1 = require("@prisma/client");
var dayjs_1 = __importDefault(require("dayjs"));
//nouvelle instance de prisma
var prisma = new client_1.PrismaClient();
//CREER UNE VIDANGE
var createVidange = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var traitement_id, traitement, nbre_heures, vidanges, regime_1, date_estimative_prochaine_vidange_1, last_vidange, diff_nbre_heures, regime, date_estimative_prochaine_vidange, diff;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                traitement_id = req.params.id;
                return [4 /*yield*/, prisma.traitement.findFirst({
                        where: {
                            id: parseInt(traitement_id),
                        },
                        include: {
                            generator: true,
                        },
                    })];
            case 1:
                traitement = _a.sent();
                // Vérifier si le traitement existe
                if (traitement == null) {
                    return [2 /*return*/, res.status(404).json({ message: "Traitement inexistant" })];
                }
                nbre_heures = req.body.nbre_heures;
                return [4 /*yield*/, prisma.vidange.findMany({
                        where: {
                            traitement_id: parseInt(traitement_id),
                        },
                    })];
            case 2:
                vidanges = _a.sent();
                if (!(vidanges.length == 0)) return [3 /*break*/, 5];
                regime_1 = traitement.generator.regime_fonctionnement;
                date_estimative_prochaine_vidange_1 = (0, dayjs_1.default)(Date.now()).add(Math.ceil(250) / regime_1, "days");
                return [4 /*yield*/, prisma.traitement.update({
                        where: {
                            id: parseInt(traitement_id),
                        },
                        data: {
                            date_estimative_prochaine_vidange: date_estimative_prochaine_vidange_1.toDate(),
                        },
                    })];
            case 3:
                _a.sent();
                // Sauvergarder la vidange
                return [4 /*yield*/, prisma.vidange.create({
                        data: {
                            nbre_heures: nbre_heures,
                            date_exec: (0, dayjs_1.default)(Date()).toDate(),
                            nbre_heures_retard: 0,
                            traitement_id: traitement.id,
                        },
                    })];
            case 4:
                // Sauvergarder la vidange
                _a.sent();
                return [2 /*return*/, res.status(201).json({ message: "Vidange enregistrée" })];
            case 5:
                last_vidange = vidanges[vidanges.length - 1];
                diff_nbre_heures = nbre_heures - last_vidange.nbre_heures;
                regime = Math.round(diff_nbre_heures / (0, dayjs_1.default)(Date.now()).diff(last_vidange.date_exec, "days"));
                if (!((traitement === null || traitement === void 0 ? void 0 : traitement.generator.regime_fonctionnement) != regime)) return [3 /*break*/, 7];
                // Mettre à jour le régime
                return [4 /*yield*/, prisma.generator.update({
                        where: {
                            id: traitement === null || traitement === void 0 ? void 0 : traitement.generator.id,
                        },
                        data: {
                            regime_fonctionnement: regime,
                        },
                    })];
            case 6:
                // Mettre à jour le régime
                _a.sent();
                _a.label = 7;
            case 7:
                date_estimative_prochaine_vidange = (0, dayjs_1.default)(Date.now()).add(Math.round(250) / regime, "days");
                diff = nbre_heures - last_vidange.nbre_heures;
                return [4 /*yield*/, prisma.traitement.update({
                        where: {
                            id: parseInt(traitement_id),
                        },
                        data: {
                            date_estimative_prochaine_vidange: (0, dayjs_1.default)(date_estimative_prochaine_vidange).toDate(),
                        },
                    })];
            case 8:
                _a.sent();
                if (!(diff <= 250)) return [3 /*break*/, 10];
                return [4 /*yield*/, prisma.vidange.create({
                        data: {
                            nbre_heures: nbre_heures,
                            date_exec: (0, dayjs_1.default)(Date()).toDate(),
                            nbre_heures_retard: 0,
                            traitement_id: traitement.id,
                        },
                    })];
            case 9:
                _a.sent();
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, prisma.vidange.create({
                    data: {
                        nbre_heures: nbre_heures,
                        date_exec: (0, dayjs_1.default)(Date()).toDate(),
                        nbre_heures_retard: Math.abs(250 - diff),
                        traitement_id: traitement.id,
                    },
                })];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12: return [2 /*return*/, res.status(201).json({
                    newRegime: regime,
                    dateEstimativeProchaineVidange: date_estimative_prochaine_vidange,
                })];
        }
    });
}); };
exports.createVidange = createVidange;
// Envoyer un aperçu du resultat de la vidange à l'utilisateur
// regime-date estimative prochaine vidage - diff nbre d'heures - retard
var getOverview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var traitement_id, traitement, nbre_heures, vidanges, regime_2, date_estimative_prochaine_vidange_2, last_vidange, diff_nbre_heures, regime, date_estimative_prochaine_vidange, diff;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                traitement_id = req.params.id;
                return [4 /*yield*/, prisma.traitement.findFirst({
                        where: {
                            id: parseInt(traitement_id),
                        },
                        include: {
                            generator: true,
                        },
                    })];
            case 1:
                traitement = _a.sent();
                // Vérifier si le traitement existe
                if (traitement == null) {
                    return [2 /*return*/, res.status(404).json({ message: "Traitement inexistant" })];
                }
                nbre_heures = req.body.nbre_heures;
                return [4 /*yield*/, prisma.vidange.findMany({
                        where: {
                            traitement_id: parseInt(traitement_id),
                        },
                    })];
            case 2:
                vidanges = _a.sent();
                // Vérifier si c'est la toute prémière vidange faite dans ce site
                if (vidanges.length == 0) {
                    regime_2 = traitement.generator.regime_fonctionnement;
                    date_estimative_prochaine_vidange_2 = (0, dayjs_1.default)(Date.now()).add(Math.ceil(250) / regime_2, "days");
                    return [2 /*return*/, res.status(200).json({
                            regime: regime_2,
                            diff_nbre_heures: 0,
                            date_estimative_prochaine_vidange: date_estimative_prochaine_vidange_2,
                            retard: 0,
                        })];
                }
                last_vidange = vidanges[vidanges.length - 1];
                diff_nbre_heures = nbre_heures - last_vidange.nbre_heures;
                regime = Math.round(diff_nbre_heures / (0, dayjs_1.default)(Date.now()).diff(last_vidange.date_exec, "days"));
                if (regime == Infinity)
                    return [2 /*return*/, res.status(401).json({
                            message: "Impossible de faire la vidange deux fois le même jour",
                        })];
                date_estimative_prochaine_vidange = (0, dayjs_1.default)(Date.now()).add(Math.ceil(250) / regime, "days");
                diff = nbre_heures - last_vidange.nbre_heures;
                if (diff <= 250) {
                    return [2 /*return*/, res.status(200).json({
                            regime: regime,
                            diff_nbre_heures: diff_nbre_heures,
                            date_estimative_prochaine_vidange: date_estimative_prochaine_vidange,
                            retard: 0,
                        })];
                }
                else {
                    return [2 /*return*/, res.status(200).json({
                            regime: regime,
                            diff_nbre_heures: diff_nbre_heures,
                            date_estimative_prochaine_vidange: date_estimative_prochaine_vidange,
                            retard: Math.abs(250 - diff),
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getOverview = getOverview;
var vidangeGetAllByTreatmentId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var treatment_id, vidanges, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                treatment_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.vidange.findMany({
                        where: {
                            traitement_id: parseInt(treatment_id),
                        },
                    })];
            case 2:
                vidanges = _a.sent();
                return [2 /*return*/, res.json(vidanges)];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.vidangeGetAllByTreatmentId = vidangeGetAllByTreatmentId;
var vidangeGetAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vidanges, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.vidange.findMany()];
            case 1:
                vidanges = _a.sent();
                return [2 /*return*/, res.json(vidanges)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.vidangeGetAll = vidangeGetAll;
var vidangeGetAllByMonth = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, month, year, vidanges, data, _i, vidanges_1, vidange, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, month = _a.month, year = _a.year;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.vidange.findMany({
                        include: {
                            traitement: {
                                include: {
                                    agent: true,
                                    generator: {
                                        include: {
                                            Site: true,
                                        },
                                    },
                                },
                            },
                        },
                    })];
            case 2:
                vidanges = _b.sent();
                data = [];
                for (_i = 0, vidanges_1 = vidanges; _i < vidanges_1.length; _i++) {
                    vidange = vidanges_1[_i];
                    if ((0, dayjs_1.default)(vidange.date_exec).month() == parseInt(month) &&
                        (0, dayjs_1.default)(vidange.date_exec).year() == parseInt(year)) {
                        data.push(vidange);
                    }
                }
                return [2 /*return*/, res.json(data)];
            case 3:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: error_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.vidangeGetAllByMonth = vidangeGetAllByMonth;
var vidangeGetOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vidange_id, vidanges, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                vidange_id = req.params.vidange_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.vidange.findFirst({
                        where: {
                            traitement_id: parseInt(vidange_id),
                        },
                    })];
            case 2:
                vidanges = _a.sent();
                return [2 /*return*/, res.json(vidanges)];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: error_4 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.vidangeGetOne = vidangeGetOne;
//# sourceMappingURL=vidangecontroller.js.map