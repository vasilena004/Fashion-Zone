import * as express from 'express';
import { sendErrorResponse } from '../utils';
import * as indicative from 'indicative';
import { Repository } from '../dao/repository';
import { Favorite, Gender, User, UserRole } from '../model/user';
import { v4 as uuidv4 } from 'uuid';
import { AlreadyExist, NotFoundError } from '../model/errors';
import { HOSTNAME, PORT } from '../server-api';
import { UserRepository } from '../dao/user-repository';
import { CartRepository } from '../dao/cart-repository';
import * as bcrypt from 'bcryptjs';
import verifyToken from '../security/verify-token';
import verifyRole from '../security/verify-role';
import { Product } from '../model/product';

const router = express.Router();

router.get("/", verifyToken, /*verifyRole([UserRole.ADMIN])*/ async (req, res) => {
    const usersRepo: UserRepository = req.app.locals.usersRepo;
    try {
        const users = await usersRepo.findAll();
        res.json(users);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get("/:id", verifyToken, verifyRole([UserRole.ADMIN, UserRole.CLIENT, UserRole.WORKER]), async (req, res) => {
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const params = req.params;
    try {
        const user = await usersRepo.findById(params.id);
        res.json(user);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            console.error(`Unable to find user: ${params.id}.`);
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.get("/:id/favorites", verifyToken, verifyRole([UserRole.CLIENT]), async (req, res) => {

    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const params = req.params;

    try {
        const user = await usersRepo.findById(params.id);
        if (user.favorites)
            res.json(user.favorites);
        else
            throw new NotFoundError("No user favorites found!");
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            console.error(`Unable to find user: ${params.id}.`);
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});


router.post("/:id/favorites", verifyToken, verifyRole([UserRole.CLIENT]), async (req, res) => {

    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const params = req.params;
    const product = req.body;

    try {
        const user = await usersRepo.findById(params.id);
        const findProduct=user.favorites.find(p=>p.productId===product.productId);
        if(findProduct){
            throw new AlreadyExist("Product is already in favorite list");
        }
        product.id = uuidv4();
        user.favorites.push(product as unknown as Favorite);
        await usersRepo.update(user, params.id);
        res.json(product);
    } catch (error) {
        if (error instanceof AlreadyExist) {
            sendErrorResponse(req, res, 403, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.get("/:id/favorites/:productId", verifyToken, verifyRole([UserRole.CLIENT]), async (req, res) => {

    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const productsRepo: Repository<Product> = req.app.locals.productsRepo;

    const params = req.params;

    try {
        const user = await usersRepo.findById(params.id);
        const favorite = user.favorites.find(f => f.productId === params.productId);
        if (favorite) {
            try {
                const product = await productsRepo.findById(favorite.productId);
                res.json(product);
            } catch (err) {
                throw new NotFoundError("Product was not found");
            }
        }
        else {
            throw new NotFoundError("This product was not found in favorites!");
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            console.error(`Unable to find user: ${params.id}.`);
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.delete("/:id/favorites/:productId", verifyToken, verifyRole([UserRole.CLIENT]), async (req, res) => {

    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const params = req.params;

    try {
        const user = await usersRepo.findById(params.id);
        const deleted = user.favorites.find(f => f.productId === params.productId);
        const updated = user.favorites.filter(f => f.productId !== params.productId);
        if (deleted) {
            user.favorites = updated;
            await usersRepo.update(user, params.id);
            res.json(deleted);
        }
        else {
            throw new NotFoundError("This product was not found in favorites!");
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            console.error(`Unable to find user: ${params.id}.`);
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.post("/", async (req, res) => {
    const usersRepo: UserRepository = req.app.locals.usersRepo;
    const cartsRepo: CartRepository = req.app.locals.cartsRepo;

    const user = req.body;
    try {
        await indicative.validator.validate(user, {
            firstName: 'required|string|min:2',
            lastName: 'required|string|min:2',
            email: 'required|email',
            password: 'required|string|min:4',
            dateOfBirth: 'required|string',
            gender: `required|integer|range:${Gender.MALE},${Gender.FEMALE},${Gender.OTHER}`
        })
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors}`, errors);
        return;
    }

    try {
        const found = await usersRepo.findByEmail(user.email as string);
        if (found) {
            sendErrorResponse(req, res, 400, `Email is already taken: ${user.email}.`, "");
        }

        user.password = await bcrypt.hash(user.password as string, 9);

        if (!user.favorites) {
            user.favorites = [];
        }

        const created = await usersRepo.create(user as unknown as User);
        const userId = { userId: created.id, id: "" }
        await cartsRepo.create(userId);

        delete created.password
        res.status(201).location(`http://${HOSTNAME}:${PORT}/api/users/${created.id}`).json(created);
    } catch (error) {
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
});


router.put("/:id", verifyToken, verifyRole([UserRole.CLIENT, UserRole.ADMIN]), async (req, res) => {
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const user = req.body;
    const params = req.params;

    if (params.id !== user.id) {
        sendErrorResponse(req, res, 400, `User ID=${user.id} does not match URL ID=${params.id}`, "invalid id");
        return;
    }
    try {
        await indicative.validator.validate(user, {
            firstName: 'required|string|min:2',
            lastName: 'required|string|min:2',
            email: 'required|email',
            password: 'required|string|min:4',
            dateOfBirth: 'required|string',
            gender: `required|integer|range:${Gender.MALE},${Gender.FEMALE},${Gender.OTHER}`
        })
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors}`, errors);
        return;
    }

    if (user.password) {
        delete user.password;
    }

    try {
        if (!user.favorites) {
            user.favorites = [];
        }
        const updated = await usersRepo.update(user as unknown as User, params.id);
        res.status(200).location(`http://${HOSTNAME}:${PORT}/api/users/${params.id}`).json(updated);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.delete("/:id", verifyToken, verifyRole([UserRole.ADMIN]), async (req, res) => {
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const params = req.params;
    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    try {
        const deleted = await usersRepo.deleteById(params.id);
        res.status(200).location(`http://${HOSTNAME}:${PORT}/api/users/`).json(deleted);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

export default router;
