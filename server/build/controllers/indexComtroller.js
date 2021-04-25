"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
var mysql = require('mysql');
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        res.send('Hello');
    };
    IndexController.prototype.getTime = function (req, res) {
        res.send('Hello');
    };
    return IndexController;
}());
exports.indexController = new IndexController();
