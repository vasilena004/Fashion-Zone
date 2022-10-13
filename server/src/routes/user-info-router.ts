import * as express from 'express';
import { sendErrorResponse } from '../utils';
import * as indicative from 'indicative';
import { Repository } from '../dao/repository';
import { Favorite, Gender, User, UserInfo, UserRole } from '../model/user';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../model/errors';
import { HOSTNAME, PORT } from '../server-api';
import { UserRepository } from '../dao/user-repository';
import { CartRepository } from '../dao/cart-repository';
import * as bcrypt from 'bcryptjs';
import verifyToken from '../security/verify-token';
import verifyRole from '../security/verify-role';
import { Product } from '../model/product';
import { UserInfoRepository } from '../dao/user-info-repository';

const router = express.Router();

router.get("/", async (req, res) => {
    const userRepo: UserInfoRepository = req.app.locals.userInfoRepo;
    try {
        const user = await userRepo.findAll();
        res.json(user[0]);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.post("/",  async (req, res) => {
    const userRepo: UserInfoRepository = req.app.locals.userInfoRepo;
    const user = req.body;
    user.id = uuidv4()
    try {
        const userInfo = await userRepo.create(user);
        res.json(userInfo);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.delete("/:userId", async (req, res) => {
    const userRepo: UserInfoRepository = req.app.locals.userInfoRepo;
    const userId = req.params.userId;
    try {
        const user = await userRepo.deleteById(userId);
        if (user) {
            res.json(user);
        }
        else {
            throw new NotFoundError("This product was not found in favorites!");
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});


export default router;
