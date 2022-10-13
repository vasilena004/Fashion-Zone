import { IdType } from "../model/user";

export interface Identifiable {
    id: IdType
}

export interface Repository<T extends Identifiable> {
    create(entity: T): Promise<T>,
    update(entity: T,id?:IdType): Promise<T>,
    deleteById(id: IdType): Promise<T>,
    findById(id: IdType): Promise<T>,
    findAll(): Promise<T[]>,
    count(): Promise<number>
}