import { Router } from 'express';

class BaseRouter {
    constructor() {
        this._router = new Router();
    }

    get router() {
        return this._router;
    }
}

export default BaseRouter;