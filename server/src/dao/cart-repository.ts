import { Db } from 'mongodb';
import { Cart } from '../model/cart';
import { NotFoundError } from '../model/errors';
import { replaceWithId } from '../utils';
import { MongodbRepository } from './mongodb-repository';

export class CartRepository extends MongodbRepository<Cart> {
    constructor(protected db: Db, protected collection: string) { 
        super(db, collection);
    }
    async findByUserId(userId: string): Promise<Cart> {
        const cart = await this.db.collection<Cart>(this.collection).findOne({userId:userId});
        return cart ? replaceWithId(cart): undefined;
    }
    async deleteByUserId(userId: string): Promise<Cart> {
        const cart=await this.findByUserId(userId);
        if(cart){
            await this.db.collection<Cart>(this.collection).deleteOne({userId:userId})        
            return cart;
        }else{
            throw new NotFoundError("No card has been created for the user");
        }
    }
}