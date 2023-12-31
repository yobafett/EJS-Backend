import DbController from './dbController.js';

class PostsController extends DbController {
    constructor(host, dbPort, dbName, dbUser, dbPass) {
        super(host, dbPort, dbName, dbUser, dbPass);
    }

    getPosts = (request, response) => {
        this.pool.query(`
            SELECT *
            FROM posts
            ORDER BY id ASC
        `, (error, results) => {
            if (error)
                throw error;
            response.status(200).json(results.rows);
        });
    }

    getPostById = (request, response) => {
        const id = parseInt(request.params.id);

        super.pool.query(`
            SELECT *
            FROM posts
            WHERE id = ${id};
        `, [], (error, results) => {
            if (error)
                throw error;
            response.status(200).json(results.rows);
        });
    }

    createPost = (request, response) => {
        const { title, description, text, authorId } = request.body;

        //TODO: Need more data validation
        if (!title || !description || !text || !authorId) {
            response.status(400).send(`Not enough data to create`);
            return;
        }

        super.pool.query(`
            INSERT INTO posts (title, description, text, author_id, created, updated)
            VALUES ('${title}', '${description}', '${text}', '${authorId}', now(), now())
            RETURNING id;
        `, [], (error, results) => {
            if (error)
                throw error;

            response.status(201).send(`Post added with ID: ${results.rows[0].id}`);
        });
    }

    updatePost = (request, response) => {
        const id = parseInt(request.params.id);
        const { title, description, text } = request.body;

        //TODO: Need more data validation
        if (!title && !description && !text) {
            response.status(400).send(`No data to update`);
            return;
        }

        super.pool.query(`
            UPDATE posts
            SET
                ${title ? "title = '" + title + "'," : ''}
                ${description ? "description = '" + description + "'," : ''}
                ${text ? "text = '" + text + "'," : ''}
                updated = now()
            WHERE id = ${id}
            RETURNING id;
            `, [], (error, results) => {
            if (error)
                throw error;

            if (results.rowCount == 0)
                response.status(400).send(`Cannot find post with id: ${id}`);
            else
                response.status(200).send(`Post modified with ID: ${results.rows[0].id}`);
        });
    }

    deletePost = (request, response) => {
        const id = parseInt(request.params.id);

        super.pool.query(`
            DELETE FROM posts
            WHERE id = ${id}
            RETURNING id;
            `, [], (error, results) => {
            if (error)
                throw error;

            if (results.rowCount == 0)
                response.status(400).send(`Cannot find post with id: ${id}`);
            else
                response.status(200).send(`Post deleted with ID: ${results.rows[0].id}`);
        });
    }
}

export default PostsController;