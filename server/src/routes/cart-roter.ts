import * as express from 'express';
import { sendErrorResponse } from '../utils';
import * as indicative from 'indicative';
import { Repository } from '../dao/repository';
import { User } from '../model/user';
import { NotFoundError } from '../model/errors';
import { HOSTNAME, PORT } from '../server-api';
import { Cart } from '../model/cart';
import { CartRepository } from '../dao/cart-repository';

const router = express.Router();

router.get("/", async (req, res) => {
    const cartsRepo: CartRepository= req.app.locals.cartsRepo;
    try {
        const carts = await cartsRepo.findAll();
        res.json(carts);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get("/:userId", async (req, res) => {
    const cartsRepo: CartRepository= req.app.locals.cartsRepo;
    const params = req.params;
    try {
        const user = await cartsRepo.findByUserId(params.userId);
        if(user){
            res.json(user);
        }else{
            throw new NotFoundError("No card has been created for the user");
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.post("/", async (req, res) => {
    const cartsRepo: Repository<Cart> = req.app.locals.cartsRepo;
    const cart = req.body;   
    try {
        const created = await cartsRepo.create(cart);
        res.status(201).location(`http://${HOSTNAME}:${PORT}/api/carts/${created.id}`).json(created);
    } catch (error) {
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
});


// router.put("/:id", async (req, res) => {
//     const cartsRepo: Repository<Cart> = req.app.locals.cartsRepo;
//     const cart = req.body;
//     const params = req.params;
    
//     try {
//         const updated= await cartsRepo.update(cart);
//         res.status(200).location(`http://${HOSTNAME}:${PORT}/api/carts/${params.id}`).json(updated);
//     } catch (error) {
//         sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
//     }
// });

router.delete("/:userId",async (req,res)=>{
    const cartsRepo: CartRepository = req.app.locals.cartsRepo;
    const params = req.params;
   try{
     const deleted=await cartsRepo.deleteByUserId(params.userId);
     res.status(200).location(`http://${HOSTNAME}:${PORT}/api/carts/`).json(deleted);
   }catch (error) {
    if (error instanceof NotFoundError) {
        sendErrorResponse(req, res, 404, error.message, error);
    } else {
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
    }
});

export default router;
