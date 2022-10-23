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
exports.dimminish_batteries_stock = exports.dimminish_refresh_stock = exports.dimminish_supremes_stock = void 0;
var db_1 = require("../db");
exports.dimminish_supremes_stock = function (product, item) { return __awaiter(void 0, void 0, void 0, function () {
    var new_product_count, option_product, new_option_product_count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                new_product_count = product.count_in_stock - item.qty;
                product.count_in_stock = new_product_count;
                if (new_product_count <= product.quantity) {
                    product.quantity = new_product_count;
                }
                return [4 /*yield*/, db_1.product_db.update_products_db(product._id, product)];
            case 1:
                _a.sent();
                return [4 /*yield*/, db_1.product_db.findById_products_db(item.option_product)];
            case 2:
                option_product = _a.sent();
                new_option_product_count = option_product.count_in_stock - item.qty;
                option_product.count_in_stock = new_option_product_count;
                return [4 /*yield*/, db_1.product_db.update_products_db(option_product._id, option_product)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.dimminish_refresh_stock = function (product, item) { return __awaiter(void 0, void 0, void 0, function () {
    var option_product, new_option_product_count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.product_db.findById_products_db(item.option_product)];
            case 1:
                option_product = _a.sent();
                new_option_product_count = option_product.count_in_stock - item.qty * 6;
                option_product.count_in_stock = new_option_product_count;
                if (new_option_product_count <= option_product.quantity) {
                    option_product.quantity = new_option_product_count;
                }
                return [4 /*yield*/, db_1.product_db.update_products_db(option_product._id, option_product)];
            case 2:
                _a.sent();
                return [4 /*yield*/, Promise.all(product.secondary_products.map(function (secondary) { return __awaiter(void 0, void 0, void 0, function () {
                        var new_secondary_count;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    new_secondary_count = secondary.count_in_stock - item.qty * 120;
                                    secondary.count_in_stock = new_secondary_count;
                                    if (new_secondary_count <= secondary.quantity) {
                                        secondary.qiuantty = new_secondary_count;
                                    }
                                    return [4 /*yield*/, db_1.product_db.update_products_db(secondary._id, secondary)];
                                case 1:
                                    _a.sent();
                                    secondary.option_products.map(function (option) { return __awaiter(void 0, void 0, void 0, function () {
                                        var new_option_product_count;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    new_option_product_count = Math.floor(new_secondary_count / option.size);
                                                    option.count_in_stock = new_option_product_count;
                                                    return [4 /*yield*/, db_1.product_db.update_products_db(option._id, option)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.dimminish_batteries_stock = function (product, item) { return __awaiter(void 0, void 0, void 0, function () {
    var new_product_count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                new_product_count = product.count_in_stock - item.qty * item.size;
                product.count_in_stock = new_product_count;
                if (new_product_count <= product.quantity) {
                    product.quantity = new_product_count;
                }
                return [4 /*yield*/, db_1.product_db.update_products_db(product._id, product)];
            case 1:
                _a.sent();
                return [4 /*yield*/, Promise.all(product.option_products.map(function (option) { return __awaiter(void 0, void 0, void 0, function () {
                        var new_option_product_count;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    new_option_product_count = Math.floor(new_product_count / option.size);
                                    option.count_in_stock = new_option_product_count;
                                    return [4 /*yield*/, db_1.product_db.update_products_db(option._id, option)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// export const calculate_refresh_pack_stock = async (product: any, item: any) => {
//   const refresh_pack: any = await product_db.findById_products_db("61a9501f914391295a266c8b");
//   const supremes: any = await product_db.findById_products_db("61a93b4c914391295a264f8d");
//   const batts_1225: any = await product_db.findById_products_db("60e158d4e615fa002a6c2de4");
//   const batts_1620: any = await product_db.findById_products_db("60e158d4e615fa002a6c2de4");
//   const batts_1616: any = await product_db.findById_products_db("60e1581fe615fa002a6c2d98");
//   const supremes_small = supremes.option_products[0];
//   const supremes_medium = supremes.option_products[1];
//   const supremes_large = supremes.option_products[2];
//   const supremes_xlarge = supremes.option_products[3];
//   const supremes_xxlarge = supremes.option_products[4];
//   const refresh_pack_count = refresh_pack.count_in_stock;
//   const supremes_count = supremes.count_in_stock;
//   const supremes_small_count = supremes_small.count_in_stock;
//   const supremes_medium_count = supremes_medium.count_in_stock;
//   const supremes_large_count = supremes_large.count_in_stock;
//   const supremes_xlarge_count = supremes_xlarge.count_in_stock;
//   const supremes_xxlarge_count = supremes_xxlarge.count_in_stock;
//   const batts_1225_count = batts_1225.count_in_stock;
//   const batts_1620_count = batts_1620.count_in_stock;
//   const batts_1616_count = batts_1616.count_in_stock;
//   const refresh_pack_supremes_small_count = supremes_small_count / 6;
//   const refresh_pack_supremes_medium_count = supremes_medium_count / 6;
//   const refresh_pack_supremes_large_count = supremes_large_count / 6;
//   const refresh_pack_supremes_xlarge_count = supremes_xlarge_count / 6;
//   const refresh_pack_supremes_xxlarge_count = supremes_xxlarge_count / 6;
//   const refresh_pack_batts_1225_count = batts_1225_count / 120;
//   const refresh_pack_batts_1620_count = batts_1620_count / 120;
//   const refresh_pack_batts_1616_count = batts_1616_count / 120;
//   const new_product_count = product.count_in_stock - item.qty * item.size;
//   product.count_in_stock = new_product_count;
//   if (new_product_count <= product.quantity) {
//     product.quantity = new_product_count;
//   }
//   await product_db.update_products_db(product._id, product);
//   await Promise.all(
//     product.option_products.map(async (option: any) => {
//       const new_option_product_count = Math.floor(new_product_count / option.size);
//       option.count_in_stock = new_option_product_count;
//       await product_db.update_products_db(option._id, option);
//     })
//   );
// };
