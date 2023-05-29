import BaseRouter from './baseRouter.js';
import UsersController from '../controllers/usersController.js';

class UsersRouter extends BaseRouter {
    constructor(dbHost, dbPort, dbName, dbUser, dbPass) {
        super();
        this._controller = new UsersController(dbHost, dbPort, dbName, dbUser, dbPass);

        this.router.get('/users', this._controller.getUsers);
        this.router.get('/users/:id', this._controller.getUserById);
        this.router.post('/users', this._controller.createUser);
        this.router.put('/users/:id', this._controller.updateUser);
        this.router.delete('/users/:id', this._controller.deleteUser);
    }
}

export default UsersRouter;
