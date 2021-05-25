"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    sessionInfo: {
        "maxAge": 1000 * 60 * 60 * 3,
        //"maxAge": 1000 * 60 , //three hr
        "sessionKey": "steveKibe",
        "serverPort": 3100,
    },
    filePath: {
        serverLog: "./src/logs/serverLogger",
        consoleLog: "./src/logs/consoleLogger",
    },
    rootDatabase: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'eben',
        timezone: 'EAT',
    }
};
