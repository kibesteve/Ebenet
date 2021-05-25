export default {
    sessionInfo: {
        "maxAge": 1000 * 60 * 60 * 3, //three hr
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
        // multipleStatements: true,
        // connectionLimit : 1000,
        // queueLimit: 0,
        // waitForConnection: true,
        // connectTimeout  : 5 * 60 * 60 * 1000,
        // acquireTimeout  : 5 * 60 * 60 * 1000,
        // timeout         : 5 * 60 * 60 * 1000,
    }

}    