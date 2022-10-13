import { Db } from 'mongodb';
import { NotFoundError } from '../model/errors';
import { IdType, UserInfo } from '../model/user';
import { replaceWithId } from '../utils';
import { MongodbRepository } from './mongodb-repository';

export class UserInfoRepository extends MongodbRepository<UserInfo> {
    constructor(protected db: Db, protected collection: string) {
        super(db, collection);
    }
    async getUserInfo(): Promise<UserInfo> {
        const user = await this.db.collection<UserInfo>(this.collection).findOne({});
        return user ? replaceWithId(user) : undefined;
    }
    async deleteByUserId(user: UserInfo) {
        const userId = user.userId;
        const deleted = await this.db.collection<UserInfo>(this.collection)
            .findOneAndDelete({ userId });
        if (!deleted) {
            throw new NotFoundError("Cannot delete user");;
        }
        return replaceWithId(user);
    }
}