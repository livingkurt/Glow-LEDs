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
var express_1 = __importDefault(require("express"));
var affiliate_1 = __importDefault(require("../models/affiliate"));
var util_1 = require("../util");
var _a = require('../util'), isAuth = _a.isAuth, isAdmin = _a.isAdmin;
var router = express_1.default.Router();
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, searchKeyword, sortOrder, affiliates, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                category = req.query.category ? { category: req.query.category } : {};
                searchKeyword = req.query.searchKeyword
                    ? {
                        facebook_name: {
                            $regex: req.query.searchKeyword,
                            $options: 'i'
                        }
                    }
                    : {};
                sortOrder = {};
                if (req.query.sortOrder === 'glover name') {
                    sortOrder = { glover_name: 1 };
                }
                else if (req.query.sortOrder === 'facebook name') {
                    sortOrder = { facebook_name: 1 };
                }
                else if (req.query.sortOrder === 'song id') {
                    sortOrder = { song_id: 1 };
                }
                else if (req.query.sortOrder === 'product') {
                    sortOrder = { product: 1 };
                }
                else if (req.query.sortOrder === 'instagram handle') {
                    sortOrder = { instagram_handle: 1 };
                }
                else if (req.query.sortOrder === 'release_date' || req.query.sortOrder === '') {
                    sortOrder = { release_date: -1 };
                }
                else if (req.query.sortOrder === 'newest') {
                    sortOrder = { _id: -1 };
                }
                return [4 /*yield*/, affiliate_1.default.find(__assign(__assign({ deleted: false }, category), searchKeyword))
                        .sort(sortOrder)
                        .populate('user')];
            case 1:
                affiliates = _a.sent();
                util_1.log_request({
                    method: 'GET',
                    path: req.originalUrl,
                    collection: 'Affiliate',
                    data: affiliates,
                    status: 200,
                    success: true,
                    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                });
                res.send(affiliates);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                util_1.log_error({
                    method: 'GET',
                    path: req.originalUrl,
                    collection: 'Affiliate',
                    error: error_1,
                    status: 500,
                    success: false
                });
                res.status(500).send({ error: error_1, message: 'Error Getting Affiliates' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var affiliate, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, affiliate_1.default.findOne({ _id: req.params.id }).populate('user')];
            case 1:
                affiliate = _a.sent();
                console.log({ affiliate: affiliate });
                console.log(req.params.id);
                if (affiliate) {
                    util_1.log_request({
                        method: 'GET',
                        path: req.originalUrl,
                        collection: 'Affiliate',
                        data: [affiliate],
                        status: 200,
                        success: true,
                        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                    });
                    res.send(affiliate);
                }
                else {
                    util_1.log_request({
                        method: 'GET',
                        path: req.originalUrl,
                        collection: 'Affiliate',
                        data: [affiliate],
                        status: 404,
                        success: false,
                        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                    });
                    res.status(404).send({ message: 'Affiliate Not Found.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                util_1.log_error({
                    method: 'GET',
                    path: req.originalUrl,
                    collection: 'Affiliate',
                    error: error_2,
                    status: 500,
                    success: false
                });
                res.status(500).send({ error: error_2, message: 'Error Getting Affiliate' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/:id', isAuth, isAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var affiliate_id, affiliate, updatedAffiliate, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                console.log({ affiliate_routes_put: req.body });
                affiliate_id = req.params.id;
                return [4 /*yield*/, affiliate_1.default.findById(affiliate_id)];
            case 1:
                affiliate = _a.sent();
                if (!affiliate) return [3 /*break*/, 3];
                return [4 /*yield*/, affiliate_1.default.updateOne({ _id: affiliate_id }, req.body)];
            case 2:
                updatedAffiliate = _a.sent();
                if (updatedAffiliate) {
                    util_1.log_request({
                        method: 'PUT',
                        path: req.originalUrl,
                        collection: 'Affiliate',
                        data: [affiliate],
                        status: 200,
                        success: true,
                        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                    });
                    return [2 /*return*/, res.status(200).send({ message: 'Affiliate Updated', data: updatedAffiliate })];
                }
                return [3 /*break*/, 4];
            case 3:
                util_1.log_error({
                    method: 'PUT',
                    path: req.originalUrl,
                    collection: 'Affiliate',
                    data: [affiliate],
                    status: 500,
                    success: false,
                    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                });
                return [2 /*return*/, res.status(500).send({ message: ' Error in Updating Affiliate.' })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                util_1.log_error({
                    method: 'PUT',
                    path: req.originalUrl,
                    collection: 'Affiliate',
                    error: error_3,
                    status: 500,
                    success: false
                });
                res.status(500).send({ error: error_3, message: 'Error Getting Affiliate' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.delete('/:id', isAuth, isAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var message, deleted_affiliate, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                message = { message: 'Affiliate Deleted' };
                return [4 /*yield*/, affiliate_1.default.updateOne({ _id: req.params.id }, { deleted: true })];
            case 1:
                deleted_affiliate = _a.sent();
                if (deleted_affiliate) {
                    util_1.log_request({
                        method: 'DELETE',
                        path: req.originalUrl,
                        collection: 'Affiliate',
                        data: [deleted_affiliate],
                        status: 200,
                        success: true,
                        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                    });
                    res.send(message);
                }
                else {
                    util_1.log_request({
                        method: 'DELETE',
                        path: req.originalUrl,
                        collection: 'Affiliate',
                        data: [deleted_affiliate],
                        status: 500,
                        success: false,
                        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                    });
                    res.send('Error in Deletion.');
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                util_1.log_error({
                    method: 'DELETE',
                    path: req.originalUrl,
                    collection: 'Affiliate',
                    error: error_4,
                    status: 500,
                    success: false
                });
                res.status(500).send({ error: error_4, message: 'Error Deleting Affiliate' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/', isAuth, isAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newAffiliate, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, affiliate_1.default.create(req.body)];
            case 1:
                newAffiliate = _a.sent();
                if (newAffiliate) {
                    util_1.log_request({
                        method: 'POST',
                        path: req.originalUrl,
                        collection: 'Affiliate',
                        data: [newAffiliate],
                        status: 201,
                        success: true,
                        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                    });
                    return [2 /*return*/, res.status(201).send({ message: 'New Affiliate Created', data: newAffiliate })];
                }
                else {
                    util_1.log_request({
                        method: 'POST',
                        path: req.originalUrl,
                        collection: 'Affiliate',
                        data: [newAffiliate],
                        status: 500,
                        success: false,
                        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
                    });
                    return [2 /*return*/, res.status(500).send({ message: ' Error in Creating Affiliate.' })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                util_1.log_error({
                    method: 'POST',
                    path: req.originalUrl,
                    collection: 'Affiliate',
                    error: error_5,
                    status: 500,
                    success: false
                });
                res.status(500).send({ error: error_5, message: 'Error Creating Affiliate' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
