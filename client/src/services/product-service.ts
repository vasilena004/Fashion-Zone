import { Product } from "../model/Product";
import { IdType } from "../model/shared-types";
import { User } from "../model/User";
import { ApiClientImpl, API_BASE_URL } from "./generic-service";


class ProductService extends ApiClientImpl<IdType, Product>{
    constructor(public apiCollectionSuffix: string) {
        super(apiCollectionSuffix);
    }
}

export const ProductApi = new ProductService('products');