import { Router } from 'express';

import { mpesaController } from '../controllers/mpesaController'

class MpesaRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        
        this.router.post('/confirmation', mpesaController.storeTransaction)
        this.router.get('/test', mpesaController.index)
    }
}

const mpesaRoutes = new MpesaRoutes();
export default mpesaRoutes.router 