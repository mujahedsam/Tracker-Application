//import * as express  from 'express';
var express = require('express');
import bodyParser from 'body-parser';
import {api} from './api.js';
import {route} from './route.js';
import * as mysql from 'mysql';

const app = express();
const router = express.Router();

let pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'sameer12345',
    database: 'tracker'
});

class serverstart {
    constructor() {
        this.app = app;
        this.router = router;
        this.port = 3000;
        this.bodyparser();
        this.server();
        this.apiroutes();
    }
    bodyparser() {
        // Body Parser Middleware
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
    }
    server() {
        app.listen(this.port, () => {
            console.log(`Server started at: ${this.port}`);
        })
    }
    apiroutes() {
        let routeobj;
        let apiobj;
        routeobj = new route(pool,this.router).router;
        apiobj = new api(pool,this.router).router;
        this.app.use(routeobj);
        this.app.use(apiobj);
    }

}

module.exports = new serverstart();
