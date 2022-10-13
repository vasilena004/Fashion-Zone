import { IdType } from "./user";

enum Delivery {
    Address = 5,
    Office = 10
}

export interface Order {
    id: IdType;
    userId: IdType;
    recipient: string;
    region: string;
    town: string;
    address: string;
    description?: string;
    deliveryType: Delivery;
    deliveryNode?: {
        companyName: string,
        VAT: string,
        UIC: string
    },
    orderDate:Date
}
