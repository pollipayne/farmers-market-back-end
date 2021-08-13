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
        while (_) try {
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
exports.MarketService = void 0;
var typeorm_1 = require("typeorm");
var userRepository_1 = require("../repository/userRepository");
var MarketRepository_1 = require("../repository/MarketRepository");
var MarketService = /** @class */ (function () {
    function MarketService() {
        var _this = this;
        this.index = function () { return __awaiter(_this, void 0, void 0, function () {
            var markets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.marketRepository.find({
                            relations: ['users', 'vendors']
                        })];
                    case 1:
                        markets = _a.sent();
                        return [2 /*return*/, markets];
                }
            });
        }); };
        this.singleIndex = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.marketRepository.findOne(id, { relations: ['users', 'vendors'] })];
                    case 1:
                        market = _a.sent();
                        return [2 /*return*/, market];
                }
            });
        }); };
        this.create = function (markets, userID) { return __awaiter(_this, void 0, void 0, function () {
            var newMarket, associatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newMarket = markets;
                        return [4 /*yield*/, this.userRepository.findOne(userID)];
                    case 1:
                        associatedUser = _a.sent();
                        if (associatedUser && newMarket.users) {
                            newMarket.users.push(associatedUser);
                        }
                        else if (associatedUser) {
                            newMarket.users = [];
                            newMarket.users.push(associatedUser);
                        }
                        else {
                            throw new Error("Couldn't find associated user");
                        }
                        return [4 /*yield*/, this.marketRepository.save(markets)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newMarket];
                }
            });
        }); };
        this.update = function (market, id) { return __awaiter(_this, void 0, void 0, function () {
            var updatedMarket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.marketRepository.update(id, market)];
                    case 1:
                        updatedMarket = _a.sent();
                        return [2 /*return*/, "market " + market.marketName + " has been updated."];
                }
            });
        }); };
        this.delete = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var deletedMarket, activeDelete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.marketRepository.findOne(id)];
                    case 1:
                        deletedMarket = _a.sent();
                        if (!deletedMarket) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.marketRepository.remove(deletedMarket)];
                    case 2:
                        activeDelete = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, "market with " + id + " ID has been deleted."];
                }
            });
        }); };
        this.marketRepository = typeorm_1.getConnection('user').getCustomRepository(MarketRepository_1.MarketRepository);
        this.userRepository = typeorm_1.getConnection('user').getCustomRepository(userRepository_1.UserRepository);
    }
    return MarketService;
}());
exports.MarketService = MarketService;
;
