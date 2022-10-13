import * as express from 'express';
import { sendErrorResponse } from '../utils';
import * as indicative from 'indicative';
import { Repository } from '../dao/repository';
import { NotFoundError } from '../model/errors';
import { HOSTNAME, PORT } from '../server-api';
import { v4 as uuidv4 } from 'uuid';
import { Color, Product, Review } from '../model/product';
import verifyToken from '../security/verify-token';
import { UserRole } from '../model/user';
import verifyRole from '../security/verify-role';

const router = express.Router();

router.get("/", async (req, res) => {
    const productsRepo: Repository<Product> = req.app.locals.productsRepo;
    try {
        const products = await productsRepo.findAll();
        res.json(products);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get("/:id", async (req, res) => {
    const productsRepo: Repository<Product> = req.app.locals.productsRepo;
    const params = req.params;
    try {
        const product = await productsRepo.findById(params.id);
        res.json(product);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});
router.post("/", /*verifyToken, verifyRole([UserRole.ADMIN, UserRole.WORKER]),*/ async (req, res) => {
    const productsRepo: Repository<Product> = req.app.locals.productsRepo;
    const product = req.body;
    try {
        await indicative.validator.validate(product, {
            productName: 'required|string|min:2|max:20',
            productCode: 'required|string|max:12',
            description: 'string|max:350',
            quantityS: 'number',
            quantityM: 'number',
            quantityL: 'number',
            quantityXL: 'number',
            color: `required|integer|range: 0,6`,
            price: 'required|number',
            imageUrl: 'required|url:field',
            category: 'required|integer|range: 0,8'
        })
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid product data: ${errors}`, errors);
        return;
    }

    try {
        if (!product.reviews) {
            product.reviews = [];
        }
        const created = await productsRepo.create(product as unknown as Product);
        res.status(201).location(`http://${HOSTNAME}:${PORT}/api/products/${created.id}`).json(created);
    } catch (error) {
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
});


router.put("/:id", verifyToken, verifyRole([UserRole.ADMIN, UserRole.WORKER]), async (req, res) => {
    const productsRepo: Repository<Product> = req.app.locals.productsRepo;
    const product = req.body;
    const params = req.params;

    if (params.id !== product.id) {
        sendErrorResponse(req, res, 400, `Product ID=${product.id} does not match URL ID=${params.id}`, "invalid id");
        return;
    }

    try {
        await indicative.validator.validate(product, {
            productName: 'required|string|min:3|max:20',
            productCode: 'required|string|max:12',
            description: 'string|max:350',
            color: `required|integer|range: 0,6`,
            price: 'required|number',
            imageUrl: 'required|url:field',
            category: 'required|integer|range: 0,8'
        })
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid product data: ${errors}`, errors);
        return;
    }

    try {
        if (!product.reviews) {
            product.reviews = [];
        }
        const updated = await productsRepo.update(product as unknown as Product, params.id);
        res.status(200).location(`http://${HOSTNAME}:${PORT}/api/products/${params.id}`).json(updated);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.delete("/:id", verifyToken, verifyRole([UserRole.ADMIN, UserRole.WORKER]), async (req, res) => {
    const productsRepo: Repository<Product> = req.app.locals.productsRepo;
    const params = req.params;
    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid product data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }

    try {
        const deleted = await productsRepo.deleteById(params.id);
        res.status(200).location(`http://${HOSTNAME}:${PORT}/api/products/`).json(deleted);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});


router.get("/:id/reviews", async (req, res) => {
    const productsRepo: Repository<Product> = req.app.locals.productsRepo;
    const params = req.params;

    try {
        const product = await productsRepo.findById(params.id);
        if (product.reviews) {
            res.json(product.reviews);
        } else {
            throw new NotFoundError("No reviews were found for this product!");
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.post("/:id/reviews", verifyToken, verifyRole([UserRole.CLIENT]), async (req, res) => {
    const productsRepo: Repository<Product> = req.app.locals.productsRepo;
    const params = req.params;
    const review = req.body;

    try {
        await indicative.validator.validate(review, {
            content: 'required|string|min:2|max:250',
            rating: 'required|number',
        });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid product review data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }

    try {
        const product = await productsRepo.findById(params.id);
        review.id = uuidv4();
        product.reviews.push(review as unknown as Review);
        await productsRepo.update(product, params.id);
        res.json(review);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.get("/:id/reviews/:reviewId", async (req, res) => {
    const productsRepo: Repository<Product> = req.app.locals.productsRepo;
    const params = req.params;

    try {
        const product = await productsRepo.findById(params.id);
        const review = product.reviews.find(r => r.id == params.reviewId);
        if (review) {
            res.json(review);
        } else {
            throw new NotFoundError("The review was not found!");
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.delete("/:id/reviews/:reviewId", verifyToken, verifyRole([UserRole.CLIENT, UserRole.ADMIN]), async (req, res) => {
    const productsRepo: Repository<Product> = req.app.locals.productsRepo;
    const params = req.params;

    try {
        const product = await productsRepo.findById(params.id);
        const reviews = product.reviews.filter(r => r.id !== params.reviewId);
        product.reviews = reviews;
        await productsRepo.update(product, params.id);
        res.json(reviews);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.put("/:id/reviews/:reviewId", verifyToken, verifyRole([UserRole.CLIENT]), async (req, res) => {
    const productsRepo: Repository<Product> = req.app.locals.productsRepo;
    const params = req.params;
    const review = req.body;
    try {
        const product = await productsRepo.findById(params.id);
        let indexOfReview = product.reviews.findIndex(r => r.id === params.reviewId);
        if (indexOfReview >= 0) {
            product.reviews[indexOfReview] = (review as unknown as Review);
            await productsRepo.update(product, params.id);
            res.json(review);
        } else {
            throw new NotFoundError("The review was not found!");
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
