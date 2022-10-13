import { MongoClient } from 'mongodb';
import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { sendErrorResponse } from './utils';
import cartsRouter from './routes/cart-roter';
import usersRouter from "./routes/users-router"
import productsRouter from "./routes/products-router";
import userInfoRouter from "./routes/user-info-router";
import ordersRouter from "./routes/order-router";
import { MongodbRepository } from './dao/mongodb-repository';
import { Product } from './model/product';
import { Order } from './model/order';
import authRouter from './routes/auth-router';
import { UserRepository } from './dao/user-repository';
import { CartRepository } from './dao/cart-repository';
import { AuthenticationError, ForbiddenError, InvalidDataError } from './model/errors';
import { NotFoundError } from 'rxjs';
import { config } from "dotenv";
import { UserInfo } from './model/user';
config();

export const HOSTNAME = 'localhost';
export const PORT = 4040;
const dbUrl = `mongodb://localhost:27017`;
const database = `ts-academy-2022-stole`;
const usersCollection = "users";
const productsCollection = "products";
const cartsCollection = "carts";
const ordersCollection = "orders";
const userInfoCollection = "user-info";


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE'
}));

app.use(logger('dev'))
app.use(express.json({ limit: '10mb' }));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter)
app.use("/api/products", productsRouter);
app.use("/api/user-info", userInfoRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/orders", ordersRouter);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    let status = 500;

    if (err instanceof AuthenticationError) {
        status = 401;
    } else if (err instanceof NotFoundError) {
        status = 404;
    } else if (err instanceof ForbiddenError) {
        status = 403;
    }
    else if (err instanceof InvalidDataError) {
        status = 400;
    }
    sendErrorResponse(req, res, err.status || status, `Server error: ${err.message}`, err);
});

(async () => {
    const con = await MongoClient.connect(dbUrl);
    const db = con.db(database);
    app.locals.usersRepo = new UserRepository(db, usersCollection);
    app.locals.productsRepo = new MongodbRepository<Product>(db, productsCollection);
    app.locals.cartsRepo = new CartRepository(db, cartsCollection);
    app.locals.ordersRepo = new MongodbRepository<Order>(db, ordersCollection);
    app.locals.userInfoRepo = new MongodbRepository<UserInfo>(db, userInfoCollection);


    app.listen(PORT, HOSTNAME, () => {
        console.log(`HTTP Server listening on: http://${HOSTNAME}:${PORT}`);
    })
})();

app.on('error', err => {
    console.log('Server error:', err);
});