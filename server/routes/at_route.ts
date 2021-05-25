import { Router } from 'express';

import {AtController} from '../controllers/at_control'

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', AtController.index);
        this.router.get('/register',AtController.register);
        this.router.get('/simulate', AtController.simulate);
        this.router.post('/stkCallback', AtController.stk_callback);
        this.router.get('/sendMessage', AtController.sendMessage);
        this.router.post('/confirmation', AtController.confirmation);
        this.router.post('/validation_url', AtController.validation);
        this.router.get('/stk', AtController.stk);
        

    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router 