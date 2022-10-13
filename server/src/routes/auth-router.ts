 import { Router } from 'express';
 import { AuthenticationError, InvalidDataError } from './../model/errors';
 import * as indicative from 'indicative';
 import * as bcrypt from 'bcryptjs';
 import * as jwt from 'jsonwebtoken';
 import Credentials from '../model/auth';
 import { Repository } from '../dao/repository';
 import { UserRepository } from './../dao/user-repository';
 import { sendErrorResponse } from '../utils';
import { Cart } from '../model/cart';
import { UserRole, UserStatus } from '../model/user';
 
 const router = Router();
 
 router.post('/login', async (req, res, next) => {
     const usersRepo: UserRepository = req.app.locals.usersRepo;
     const credentials = req.body as Credentials;
     try {
         await indicative.validator.validate(credentials, {
             email: 'required|email',
             password: 'required|string|min:4'
         });
     } catch (errors) {
         sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
         return;
     }
     try {
         const user = await usersRepo.findByEmail(credentials.email);
         if (!user) {
             next(new AuthenticationError(`Email or password is incorrect.`));
             return;
         }
         const passIsValid = await bcrypt.compare(credentials.password, user.password);
         if (!passIsValid) {
             next(new AuthenticationError(`Email or password is incorrect.`));
             return;
         }
         const token = jwt.sign({ id: user.id }, process.env.SHOPPING_API_SECRET, {
             expiresIn: '1h'
         });
         delete user.password;
         res.status(200).json({ token, user });
     } catch (err) {
         next(err);
     }
 
 });
 
 router.post('/register', async (req, res, next) => {
     const usersRepo: UserRepository = req.app.locals.usersRepo;
     const cartsRepo: Repository<Cart> = req.app.locals.cartsRepo;
     const newUser = req.body;
     try {
         await indicative.validator.validate(newUser, {
             firstName: 'required|string|min:2',
             lastName: 'required|string|min:2',
             email: 'required|string|email',
             password: 'required|string|min:4',
         });
     } catch (errors) {
         sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
         return;
     }
     try {
         const found = await usersRepo.findByEmail(newUser.email);
         if (found) {
             sendErrorResponse(req, res, 400, `Email is already taken: ${newUser.email}.`,"");
         }
 
         newUser.password = await bcrypt.hash(newUser.password, 9); 

         if(!newUser.favorites){
            newUser.favorites=[];
         }
         newUser.role=UserRole.CLIENT;
         newUser.status=UserStatus.ACTIVE;
         newUser.registrationAt=new Date();
         newUser.timeOfLastModification=new Date();

         const created = await usersRepo.create(newUser);
         const userId={userId:created.id,id:""}
         await cartsRepo.create(userId);
         
         delete created.password;
 
         res.status(201).location(`/api/users/${created.id}`).json(created);
     } catch (err) {
         next(err);
     }
 });
 
 export default router;