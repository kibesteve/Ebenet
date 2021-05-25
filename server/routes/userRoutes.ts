import { Router } from 'express';

import { userController } from '../controllers/userController'

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', userController.index);
        this.router.get('/getRoomData', userController.getRoomData);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router