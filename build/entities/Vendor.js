"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor = void 0;
var typeorm_1 = require("typeorm");
var Market_1 = require("./Market");
var Product_1 = require("./Product");
var Vendor = /** @class */ (function () {
    function Vendor() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Vendor.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Vendor.prototype, "vendorName", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Vendor.prototype, "vendorSeason", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Market_1.Market; }, function (market) { return market.vendors; }),
        __metadata("design:type", Array)
    ], Vendor.prototype, "markets", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Product_1.Product; }, function (product) { return product.vendors; }, {
            cascade: true
        }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Vendor.prototype, "products", void 0);
    Vendor = __decorate([
        typeorm_1.Entity()
    ], Vendor);
    return Vendor;
}());
exports.Vendor = Vendor;
