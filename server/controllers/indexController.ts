import { Request, Response } from 'express';
var mysql = require('mysql');

import store from '../serverConfig'


class IndexController {
    public index(req: Request, res: Response) {
        res.send('Hello')
    }
    public getTime(req: Request, res: Response) {
        res.send('Hello')
    }
}

export const indexController = new IndexController();
