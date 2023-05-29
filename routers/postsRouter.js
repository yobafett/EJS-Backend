import BaseRouter from './baseRouter.js';
import PostsController from '../controllers/postsController.js';

class PostsRouter extends BaseRouter {
    constructor(dbHost, dbPort, dbName, dbUser, dbPass) {
        super();
        this._controller = new PostsController(dbHost, dbPort, dbName, dbUser, dbPass);

        this.router.get('/posts', this._controller.getPosts);
        this.router.get('/posts/:id', this._controller.getPostById);
        this.router.post('/posts', this._controller.createPost);
        this.router.put('/posts/:id', this._controller.updatePost);
        this.router.delete('/posts/:id', this._controller.deletePost);
    }
}

export default PostsRouter;
