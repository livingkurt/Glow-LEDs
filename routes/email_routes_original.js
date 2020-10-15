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
var nodemailer_1 = __importDefault(require("nodemailer"));
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("../models/user"));
var App_1 = __importDefault(require("../email_templates/App"));
var styles_1 = __importDefault(require("../email_templates/styles"));
var index_1 = require("../email_templates/pages/index");
var sgMail = require('@sendgrid/mail');
require('dotenv').config();
var router = express_1.default.Router();
var PHE = require('print-html-element');
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
// module.exports = (app) => {
// 	app.post('/api/email/order_confirmation', async (req, res) => {
// 		const { recipient, orderNumber } = req.body;
// 		sgMail.setApiKey(process.env.SENDGRID_SECRET);
// 		const message = {
// 			to: recipient,
// 			from: 'keibooher@gmail.com', // Use the email address or domain you verified above
// 			subject: 'Sending with Twilio SendGrid is Fun',
// 			text: 'and easy to do anywhere, even with Node.js',
// 			html: confirmationTemplate(orderNumber)
// 		};
// 		try {
// 			sgMail.send(message);
// 			res.send(200);
// 		} catch (err) {
// 			res.status(422).send(err);
// 		}
// 	});
// };
// router.post('/contact', async (req, res) => {
// 	// const data = req.body;
// 	// console.log({ contact: req.body });
// 	console.log(process.env.SENDGRID_SECRET);
// 	sgMail.setApiKey(process.env.SENDGRID_SECRET);
// 	const message = {
// 		to: 'info@glow-leds.com',
// 		from: 'info@glow-leds.com', // Use the email address or domain you verified above
// 		subject: `New message from ${req.body.first_name} - ${req.body.reason_for_contact}`,
// 		text: 'and easy to do anywhere, even with Node.js',
// 		html: contact_view(req.body)
// 	};
// 	try {
// 		sgMail.send(message);
// 		res.send(200);
// 	} catch (err) {
// 		res.status(422).send(err);
// 	}
// });
router.post('/invoice', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log({ invoice: req.body });
        // PHE.printHtml(invoice_view(req.body));
        res.render('./invoice.html');
        return [2 /*return*/];
    });
}); });
router.post('/contact', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mailOptions;
    return __generator(this, function (_a) {
        // const data = req.body;
        console.log({ contact: req.body });
        console.log(process.env.SENDGRID_SECRET);
        mailOptions = {
            to: process.env.DISPLAY_EMAIL,
            from: req.body.email,
            subject: "New message from " + req.body.first_name + " - " + req.body.reason_for_contact,
            html: index_1.contact_view(req.body)
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('Contact Email Sent to ' + req.body.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/contactconfirmation', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mailOptions;
    return __generator(this, function (_a) {
        // const data = req.body;
        console.log({ contact: req.body });
        console.log(process.env.SENDGRID_SECRET);
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: req.body.email,
            subject: "Thank you for Contacting Glow LEDs Support",
            html: index_1.contact_confirmation_view(req.body)
        };
        // try {
        // 	sgMail.send(mailOptions);
        // 	res.send(200);
        // } catch (err) {
        // 	res.status(422).send(err);
        // }
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('Contact Email Sent to ' + req.body.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/passwordreset', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mailOptions;
    return __generator(this, function (_a) {
        console.log({ passwordreset: req.body });
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: req.body.email,
            subject: 'Glow LEDs Password Reset',
            html: App_1.default(index_1.reset_password_view(req.body), styles_1.default())
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('Password Reset Email Sent to ' + req.body.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/verified', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mailOptions;
    return __generator(this, function (_a) {
        console.log({ register: req.body });
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: req.body.email,
            subject: 'Glow LEDs Account Confirmation',
            html: App_1.default(index_1.verified_account_view(req.body), styles_1.default())
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('Registration Email Sent to ' + req.body.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/verify', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mailOptions;
    return __generator(this, function (_a) {
        console.log({ register: req.body });
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: req.body.email,
            subject: 'Glow LEDs Account Verification',
            html: App_1.default(index_1.verify_account_view(req.body), styles_1.default())
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('Verification Email Sent to ' + req.body.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/order', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paid, shipped, user, mailOptions;
    return __generator(this, function (_a) {
        console.log({ order: req.body });
        paid = 'Paid';
        shipped = 'Not Shipped';
        user = {};
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: req.body.shipping.email,
            subject: 'Glow LEDs Order Confirmation',
            html: App_1.default(index_1.order_view(__assign(__assign({}, req.body), { title: 'Your Order Has Been Placed', paid: paid, shipped: shipped })), styles_1.default())
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('Order Email Sent to ' + req.body.shipping.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/refund', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paid, shipped, refunded, user, mailOptions;
    return __generator(this, function (_a) {
        console.log({ refund: req.body });
        paid = 'Paid';
        shipped = req.body.isShipped ? 'Shipped' : 'Not Shipped';
        refunded = true;
        user = {};
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: req.body.shipping.email,
            subject: 'Glow LEDs Order Refund',
            bcc: process.env.EMAIL,
            html: App_1.default(index_1.refund_view(__assign(__assign({}, req.body), { title: 'You have been refunded for your order', paid: paid, shipped: shipped, refunded: refunded })), styles_1.default())
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('Order Email Sent to ' + req.body.shipping.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/order', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paid, shipped, user, mailOptions;
    return __generator(this, function (_a) {
        console.log({ order: req.body.token });
        console.log({ order: req.body.token.card.last4 });
        paid = 'Paid';
        shipped = 'Not Shipped';
        user = {};
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: req.body.shipping.email,
            subject: 'Glow LEDs Order Confirmation',
            html: App_1.default(index_1.order_view(__assign(__assign({}, req.body), { title: 'Your Order Has Been Placed', paid: paid, shipped: shipped })), styles_1.default())
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('Order Email Sent to ' + req.body.shipping.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/sale', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paid, shipped, user, mailOptions;
    return __generator(this, function (_a) {
        paid = 'Paid';
        shipped = 'Not Shipped';
        user = {};
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: process.env.EMAIL,
            subject: 'New Order from ' + req.body.shipping.first_name,
            html: App_1.default(index_1.order_view(__assign(__assign({}, req.body), { title: 'New Order from ' + req.body.shipping.first_name, paid: paid, shipped: shipped })), styles_1.default())
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('New Order Made by ' + req.body.shipping.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/paid', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, paid, shipped, mailOptions;
    return __generator(this, function (_a) {
        console.log({ paid: req.body });
        user = {};
        paid = 'Paid';
        shipped = 'Not Shipped';
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: process.env.EMAIL,
            subject: 'Order Paid by ' + req.body.shipping.first_name,
            html: App_1.default(index_1.order_view(__assign(__assign({}, req.body), { title: 'Order Paid by ' + req.body.shipping.first_name, paid: paid, shipped: shipped })), styles_1.default())
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('New Order Paid by ' + req.body.shipping.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/notpaid', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, paid, shipped, mailOptions;
    return __generator(this, function (_a) {
        console.log({ notpaid: req.body });
        user = {};
        paid = 'Not Paid';
        shipped = 'Not Shipped';
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: req.body.shipping.email,
            bcc: process.env.EMAIL,
            subject: 'Glow LEDs Order Not Complete',
            html: App_1.default(index_1.order_view(__assign(__assign({}, req.body), { title: 'Order Not Complete', paid: paid, shipped: shipped })), styles_1.default())
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('Order Not Complete for ' + req.body.shipping.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/notverified', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, mailOptions;
    return __generator(this, function (_a) {
        console.log({ notpaid: req.body });
        user = {};
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: req.body.email,
            bcc: process.env.EMAIL,
            subject: 'Having Trouble Verifying your Glow LEDs Account',
            html: App_1.default(index_1.not_verified_view(req.body), styles_1.default())
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('Not Verified Email Sent to ' + req.body.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/orderpaid', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, paid, shipped, mailOptions;
    return __generator(this, function (_a) {
        console.log({ paid: req.body });
        user = {};
        paid = 'Paid';
        shipped = 'Not Shipped';
        mailOptions = {
            from: process.env.DISPLAY_EMAIL,
            to: req.body.shipping.email,
            subject: 'Here is your receipt from Glow LEDs',
            html: App_1.default(index_1.order_view(__assign(__assign({}, req.body), { title: 'Order Complete! \nHere is your receipt from Glow LEDs', paid: paid, shipped: shipped })), styles_1.default())
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
                res.send(err);
            }
            else {
                console.log('New Order Paid by ' + req.body.shipping.first_name);
                res.send('Email Successfully Sent');
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/shipping', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, paid, shipped, error_1, mailOptions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log({ shipping: req.body });
                user = {};
                paid = 'Paid';
                shipped = 'Shipped';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({ _id: req.body.user })];
            case 2:
                user = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.send({ message: error_1.message });
                return [3 /*break*/, 4];
            case 4:
                mailOptions = {
                    from: process.env.DISPLAY_EMAIL,
                    // from: 'Kurt LaVacque <lavacquek@gmail.com>',
                    to: req.body.email,
                    subject: 'Glow LEDs Shipping Confirmation',
                    html: App_1.default(index_1.order_view(__assign(__assign({}, req.body), { title: 'Your Item has Shipped!', paid: paid, shipped: shipped })), styles_1.default())
                };
                console.log(req.body);
                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        console.log('Error Occurs', err);
                        res.send(err);
                    }
                    else {
                        console.log('Shipping Email Sent to ' + req.body.first_name);
                        res.send('Email Successfully Sent');
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
router.post('/delivery', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2, mailOptions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log({ delivery: req.body });
                user = {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({ _id: req.body.user })];
            case 2:
                user = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.send({ message: error_2.message });
                return [3 /*break*/, 4];
            case 4:
                mailOptions = {
                    from: process.env.DISPLAY_EMAIL,
                    to: req.body.email,
                    subject: 'Glow LEDs Delivery Confirmation',
                    html: App_1.default(index_1.order_view(__assign(__assign({}, req.body), { title: 'Your Item has Been Delivered!' })), styles_1.default())
                };
                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        console.log('Error Occurs', err);
                        res.send(err);
                    }
                    else {
                        console.log('Delivery Email Sent to ' + req.body.first_name);
                        res.send('Email Successfully Sent');
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
// module.exports = router;
exports.default = router;
