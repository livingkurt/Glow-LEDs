"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (props) {
    return "\n  <body style=\"padding:0;margin:0\">\n  <div>\n  <div style=\"font-family:helvetica;margin:0px;padding:0px;width:100%;border-radius:20px\">\n    <div style=\"background-color:#333333;padding:20px\">\n      <div style=\"display:flex;justify-content:center\">\n        <table width=\"100%\" style=\"max-width:500px\">\n          <tr>\n            <td><img src=\"https://images2.imgbox.com/63/e7/BPGMUlpc_o.png\" alt=\"Glow LEDs\"\n                style=\"text-align:center;width:100%;margin-right:20px\" /></td>\n          </tr>\n        </table>\n      </div>\n      <h4\n      style=\"text-align:center;font-family:helvetica;width:100%;margin:0 auto;line-height:50px;color:white;font-size:2em\">\n      Log Error: " + props.title + "</h4>\n  </div>\n  " + props.body + "\n  </div>\n  </div>\n</div>\n</body>\n\t";
});
