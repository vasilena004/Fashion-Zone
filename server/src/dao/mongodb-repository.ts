import { Db, Filter, ObjectId, OptionalUnlessRequiredId, UpdateFilter } from "mongodb";
import { NotFoundError } from "../model/errors";
import { IdType } from "../model/user";
import { replaceWithId } from "../utils";
import { Identifiable, Repository } from "./repository";

export class MongodbRepository<T extends Identifiable> implements Repository<T>{

    constructor(protected db: Db, protected collection: string) { }

    async create(entity: T): Promise<T> {
        try {
            delete entity.id;
            const document = entity as OptionalUnlessRequiredId<T>;
            await this.db.collection<T>(this.collection).insertOne(document);
            return replaceWithId(document);
        } catch (err) {
            throw new Error("An error occur!");
        }
    }
    async update(entity: T, id: IdType): Promise<T> {
        try {
            delete entity.id;
            entity["_id"] = new ObjectId(id);
            const document = entity as OptionalUnlessRequiredId<T>;

            await this.db.collection<T>(this.collection)
                .updateOne({ _id: new ObjectId(id) } as unknown as Filter<T>,
                    { $set: entity } as unknown as UpdateFilter<T>);

            return replaceWithId(document);
        } catch (err) {
            throw new NotFoundError("User was not found! :(");
        }
    }
    async deleteById(id: string): Promise<T> {
        try {
            const entity = await this.findById(id);
            await this.db.collection<T>(this.collection)
                .deleteOne({ _id: new ObjectId(id) } as unknown as Filter<T>)
            return entity;
        } catch (err) {
            throw new NotFoundError("User was not found! :(");
        }
    }
    async findById(id: string): Promise<T> {
        try {
            const entity = await this.db.collection<T>(this.collection)
                .findOne({ _id: new ObjectId(id) } as unknown as Filter<T>);
            return replaceWithId(entity);
        } catch (err) {
            throw new NotFoundError("User was not found! :(")
        }
    }
    async findAll(): Promise<T[]> {
        try {
            const entities = await this.db.collection<T>(this.collection).find().toArray();
            return entities.map(entity => replaceWithId(entity));
        } catch (err) {
            throw new Error("An error occur!");
        }
    }
    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }

}