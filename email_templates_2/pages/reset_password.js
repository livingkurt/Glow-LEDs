"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (props) {
    return "\n \n  <div style=\"background-color:#5f5f5f;padding:20px\">\n  <div style=\"display:flex;justify-content:center\"></div>\n  <h4 style=\"text-align:center;font-family:helvetica;color:white;font-size:1.5em;margin-top:20px;margin-bottom:0\">\n    Someone has requested a link to change your password.</h4>\n  <p style=\"font-size:16px;line-height:30px;max-width:800px;width:100%;margin:20px auto;color:white\">Click the\n    Link Below to Continue the Password Change Process. 'If you didn\u2019t request this, please ignore this email. Your password won\u2019t change until you access the\n    link below and create a new one.</p>\n  <div style=\"display:flex;justify-content:center\"><a href=\"" + (process.env.NODE_ENV === 'production'
        ? 'http://www.glow-leds.com'
        : 'http://localhost:3000') + "/account/resetpassword/" + props._id + "\" alt=\"discount image\"\n      style=\"background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px\">\n      <h4 style=\"font-family:helvetica;margin:0;font-size:1.2em;text-align:center\">Change your Password</h4>\n    </a></div>\n</div>\n      \n    \n\t";
});
