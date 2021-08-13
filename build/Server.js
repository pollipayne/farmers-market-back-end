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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express_1 = __importDefault(require("express"));
var UsersController_1 = require("./controllers/UsersController");
var typeorm_1 = require("typeorm");
var MarketController_1 = require("./controllers/MarketController");
var cors_1 = __importDefault(require("cors"));
var VendorController_1 = require("./controllers/VendorController");
var ProductController_1 = require("./controllers/ProductController");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.configuration();
        this.routes();
    }
    Server.prototype.configuration = function () {
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
    };
    Server.prototype.routes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.createConnection({
                            name: 'user',
                            type: "postgres",
                            host: "localhost",
                            port: 5432,
                            username: "postgres",
                            password: "postgres",
                            database: "market",
                            entities: [
                                'build/entities/*.js'
                            ],
                            synchronize: true,
                            logging: false
                        }).then(function (connection) {
                            console.log(connection.options);
                            // here you can start to work with your entities
                        }).catch(function (error) {
                            console.log(error);
                        })];
                    case 1:
                        _a.sent();
                        this.usersController = new UsersController_1.UsersController();
                        this.marketsController = new MarketController_1.MarketController();
                        this.vendorController = new VendorController_1.VendorController();
                        this.productController = new ProductController_1.ProductController();
                        this.app.get('/', function (req, res) {
                            res.send("LOOK AT ME I'M A HOME PAGE ENDPOINT!!!!!");
                        });
                        this.app.use("/users/", this.usersController.router);
                        this.app.use("/markets/", this.marketsController.router);
                        this.app.use("/vendors/", this.vendorController.router);
                        this.app.use("/products/", this.productController.router); // configure routes of the users controller
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log("Server is listening at port " + _this.app.get('port') + ".");
        });
    };
    return Server;
}());
exports.Server = Server;
var server = new Server();
server.start();
