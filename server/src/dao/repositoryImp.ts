import { Identifiable, Repository } from "./repository";
import { promises } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from "../model/errors";
import { IdType } from "../model/user";

export class FileRepositoryImp<T extends Identifiable> implements Repository<T>{
    constructor(private dbFile: string) { }

    async create(entity: T): Promise<T> {
        const allEntities = await this.findAll();
        entity.id = uuidv4();
        allEntities.push(entity);
        this.save(allEntities);
        return entity;
    }
    async update(entity: T): Promise<T> {
        const allEntities = await this.findAll();
        const indexOfEntity = allEntities.findIndex(e => e.id === entity.id);
        allEntities[indexOfEntity]=entity;
        this.save(allEntities);
        return entity;
    }
    async deleteById(id: string): Promise<T> {
        const allEntities = await this.findAll();
        const indexOfEntity = allEntities.findIndex(e => e.id === id);
        if (indexOfEntity < 0) {
            throw new NotFoundError(`Entity with ID = '${id}' not found.`);
        }
        const deletedEntity = allEntities.splice(indexOfEntity, 1)[0];
        this.save(allEntities);
        return deletedEntity;
    }

    async findById(id: string): Promise<T> {
        const allEntities = await this.findAll();
        const result =  allEntities.find(e => e.id === id);
        if (!result) {
            throw new NotFoundError(`Entity with ID = '${id}' not found.`);
        }
        return result;
    }
    async findAll(): Promise<T[]> {
        const entitiesData = await promises.readFile(this.dbFile);
        return JSON.parse(entitiesData.toString());
    }
    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    private async save(entities: T[]) {
        promises.writeFile(this.dbFile, JSON.stringify(entities));
    }

}