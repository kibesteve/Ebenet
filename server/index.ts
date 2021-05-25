require('dotenv').config();
import express, { Application } from 'express';
import session from "express-session";
import cors from 'cors';
const moment = require('moment')
import store from './serverConfig'
//const {consoleLog,serverLog} =require('./logs/createLogger')
import indexRoutes from './routes/indexRoutes';
import at_route from './routes/at_route'
import userRoutes from './routes/userRoutes'
import mpesaRoutes from './routes/mpesaRoutes'
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
 
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus:200,
}
class Server {
    
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || store.sessionInfo.serverPort);
        //this.app.use(morgan('dev'));
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));


        this.app.use(session({
            secret: store.sessionInfo.sessionKey,
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge:store.sessionInfo.maxAge } //3hrs
        })); 
    }

    routes(): void {
        this.app.use('/',indexRoutes);
        this.app.use('/user',userRoutes)
        this.app.use('/mpesa',mpesaRoutes)
        this.app.use('/confirmation',mpesaRoutes)
        
        /*
        this.app.use('/api/customer',custRoutes);
        // this.app.use('/api/timesheet', CommonController.checkSession, timesheetRoutes);
        // this.app.use('/api/admin', CommonController.checkSession, adminRoutes);
        this.app.use('/api/common', commonRoutes);
        this.app.use('/api/projectPlan',projectPlanRoutes)

        this.app.use('/api/report',reportRoutes)
        */
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
            //consoleLog.info('Server on port ',this.app.get('port'))
        })
    }
}

const server = new Server();  
server.start();



