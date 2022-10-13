import * as express from 'express';
import { sendErrorResponse } from '../utils';
import * as indicative from 'indicative';
import { Repository } from '../dao/repository';
import { User, UserRole } from '../model/user';
import { NotFoundError } from '../model/errors';
import { HOSTNAME, PORT } from '../server-api';
import { Order } from '../model/order';
import verifyToken from '../security/verify-token';
import verifyRole from '../security/verify-role';

const router = express.Router();

router.get("/",verifyToken, verifyRole([UserRole.ADMIN]), async (req, res) => {
    const ordersRepo: Repository<Order> = req.app.locals.ordersRepo;
    try {
        const orders = await ordersRepo.findAll();
        res.json(orders);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get("/:id",verifyToken, verifyRole([UserRole.ADMIN,UserRole.CLIENT]), async (req, res) => {
    const ordersRepo: Repository<Order> = req.app.locals.ordersRepo;
    const params = req.params;
    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid order data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }

    try {
        const order = await ordersRepo.findById(params.id);
        res.json(order);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            console.error(`Unable to find order: ${params.id}.`);
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.post("/",verifyToken, verifyRole([UserRole.ADMIN,UserRole.CLIENT]), async (req, res) => {
    const ordersRepo: Repository<Order> = req.app.locals.ordersRepo;
    const order = req.body as unknown as Order;
    try {
        await indicative.validator.validate(order, {
            
        })
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid order data: ${errors}`, errors);
        return;
    }
   
    try {
        order.orderDate=new Date();
        const created = await ordersRepo.create(order);
        res.status(201).location(`http://${HOSTNAME}:${PORT}/api/orders/${created.id}`).json(created);
    } catch (error) {
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
});


router.put("/:id",verifyToken, verifyRole([UserRole.ADMIN,UserRole.CLIENT]), async (req, res) => {
    const ordersRepo: Repository<Order> = req.app.locals.ordersRepo;
    const order = req.body;
    const params = req.params;
    
    try {
        const updated= await ordersRepo.update(order as unknown as Order);
        res.status(200).location(`http://${HOSTNAME}:${PORT}/api/orders/${params.id}`).json(updated);
    } catch (error) {
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
});

router.delete("/:id",verifyToken, verifyRole([UserRole.ADMIN,UserRole.CLIENT]),async (req,res)=>{
    const ordersRepo: Repository<Order> = req.app.locals.ordersRepo;
    const params = req.params;
   try{
     const deleted=await ordersRepo.deleteById(params.id);
     res.status(200).location(`http://${HOSTNAME}:${PORT}/api/orders/`).json(deleted);
   }catch (error) {
    if (error instanceof NotFoundError) {
        sendErrorResponse(req, res, 404, error.message, error);
    } else {
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
    }
});

export default router;
