"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (props) {
    console.log({ props: props });
    return "\n    <h1>\n      Hello Kurt,\n    </h1>\n    <p>\n      " + props.message + "\n    </p>\n    <h3>\n      Thank you,\n    </h3>\n    <p>\n\n      <div>Name: " + props.first_name + " " + props.last_name + "</div>\n\n      <div>User Email: " + props.email + "</div>\n\n      <div>Order Number: " + props.order_number + "</div>\n\n      <div>Reason For Contact: " + props.reason_for_contact + "</div>\n    </p>\n\t";
});
