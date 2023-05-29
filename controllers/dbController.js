import pg from "pg";

class DbController {
    constructor(host, dbPort, dbName, dbUser, dbPass) {
        this._pool = new pg.Pool({
            host: host,
            port: dbPort,
            database: dbName,
            user: dbUser,
            password: dbPass,
        });
    }

    get pool() {
        return this._pool;
    }
}

export default DbController;