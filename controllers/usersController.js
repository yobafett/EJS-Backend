import DbController from './dbController.js';

class UsersController extends DbController {
    constructor(host, dbPort, dbName, dbUser, dbPass) {
        super(host, dbPort, dbName, dbUser, dbPass);
    }

    getUsers = (request, response) => {
        this.pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }

    getUserById = (request, response) => {
        const id = parseInt(request.params.id)

        super.pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }

    createUser = (request, response) => {
        const { name, email } = request.body

        super.pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${results.insertId}`)
        })
    }

    updateUser = (request, response) => {
        const id = parseInt(request.params.id)
        const { name, email } = request.body

        super.pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3',
            [name, email, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`User modified with ID: ${id}`)
            }
        )
    }

    deleteUser = (request, response) => {
        const id = parseInt(request.params.id)

        super.pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User deleted with ID: ${id}`)
        })
    }
}

export default UsersController;