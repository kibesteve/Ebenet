"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require('mysql');
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        console.log("Home page");
        res.send('Hello yall');
    };
    IndexController.prototype.getTime = function (req, res) {
        res.send('Hello');
    };
    return IndexController;
}());
exports.indexController = new IndexController();
