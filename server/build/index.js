"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var cors_1 = __importDefault(require("cors"));
var moment = require('moment');
var serverConfig_1 = __importDefault(require("./serverConfig"));
//const {consoleLog,serverLog} =require('./logs/createLogger')
var indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var mpesaRoutes_1 = __importDefault(require("./routes/mpesaRoutes"));
/*
import morgan from 'morgan';


import indexRoutes from './routes/indexRoutes';
import timesheetRoutes from './routes/timesheetRoutes';
import adminRoutes from './routes/adminRoutes';
import custRoutes from './routes/customerRoutes'

import commonRoutes from './routes/commonRoutes';


import CommonController from './controllers/commonController'
import projectPlanRoutes from './routes/projectPlanRoute'

import reportRoutes from './routes/reportRoutes'
 
*/
var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || serverConfig_1.default.sessionInfo.serverPort);
        //this.app.use(morgan('dev'));
        this.app.use(cors_1.default(corsOptions));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_session_1.default({
            secret: serverConfig_1.default.sessionInfo.sessionKey,
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: serverConfig_1.default.sessionInfo.maxAge } //3hrs
        }));
    };
    Server.prototype.routes = function () {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/user', userRoutes_1.default);
        this.app.use('/mpesa', mpesaRoutes_1.default);
        this.app.use('/confirmation', mpesaRoutes_1.default);
        /*
        this.app.use('/api/customer',custRoutes);
        // this.app.use('/api/timesheet', CommonController.checkSession, timesheetRoutes);
        // this.app.use('/api/admin', CommonController.checkSession, adminRoutes);
        this.app.use('/api/common', commonRoutes);
        this.app.use('/api/projectPlan',projectPlanRoutes)

        this.app.use('/api/report',reportRoutes)
        */
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log('Server on port', _this.app.get('port'));
            //consoleLog.info('Server on port ',this.app.get('port'))
        });
    };
    return Server;
}());
var server = new Server();
server.start();
