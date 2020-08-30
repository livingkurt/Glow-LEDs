// module.exports = {
//   verify_account_view: require("./verify_account_view"),
//   verified_account_view: require("./verified_account_view"),
//   reset_password_view: require("./reset_password_view"),
//   contact_view: require("./contact_view"),
//   order_view: require("./order_view")
// };

export { default as verify_account_view } from './verify_account_view';
export { default as not_verified_view } from './not_verified_view';
export { default as verified_account_view } from './verified_account_view';
export { default as reset_password_view } from './reset_password_view';
export { default as contact_view } from './contact_view';
export { default as order_view } from './order_view';
export { default as refund_view } from './refund_view';
export { default as contact_confirmation_view } from './contact_confirmation_view';
