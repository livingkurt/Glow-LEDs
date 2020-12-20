"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (props) {
    return "\n \n      <div style=\"background-color:#5f5f5f;padding:20px\">\n        <h4 style=\"text-align:center;font-family:helvetica;color:white;font-size:1.5em;margin-top:20px;margin-bottom:0\">\n        Error: " + props.error.code + "</h4>\n        <p\n          style=\"font-size:16px;line-height:30px;max-width:800px;text-align:center;width:100%;margin:20px auto;color:white\">\n          File: " + props.file + "</p>\n        <p\n          style=\"font-size:16px;line-height:30px;max-width:800px;text-align:center;width:100%;margin:20px auto;color:white\">\n          Status: " + props.status + "</p>\n          <p\n          style=\"font-size:16px;line-height:30px;max-width:800px;text-align:center;width:100%;margin:20px auto;color:white\">\n          Path: " + props.path + "</p>\n      </div>\n      \n    \n\t";
});
