import express from 'express';
import PostsRouter from './routers/postsRouter.js';
import { getConfig } from './utils/common.js';

const { dbHost, dbPort, dbName, dbUser, dbPass, serverPort } = getConfig();
const postRouter = new PostsRouter(dbHost, dbPort, dbName, dbUser, dbPass);

const app = express();
app.use(express.json());
app.use('/api', postRouter.router);

// app.get('/', (req, res) => {
//     console.log(req.query);
//     console.log(req.method);
//     res.status(200).json('resJson');
// })

// app.post('/', (req, res) => {
//     console.log(req.body);
//     console.log(req.method);
//     res.status(200).json('resJson');
// })

try {
    app.listen(serverPort, () => {
        console.log(`Server start on port ${serverPort}`);
    })
} catch (error) {
    console.error(error);
}