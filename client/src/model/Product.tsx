import { IdType } from "./shared-types";

enum Size{
    "S"=0,
    "M",
    "L",
    "XL"
}

export enum Category{
    "Dress"=0,
    "Jacket",
    "Coat",
    "Jeans",
    "Skirt",
    "T-Shirt",
    "Top",
    "Vest",
    "Sportswear"
}

export enum Color{
    "Pink"=0,
    "Yellow",
    "Red",
    "Black",
    "Blue",
    "Green",
    "Grey",
}

export interface Sizes{
    size:Size,
    quantity:number
}

export interface Review{
   id:IdType,
   content:string,
   rating:number;
}

export class Product {
  constructor(
    public id: IdType,
    public productName: string,
    public productCode: string,
    public color: number,
    public price: number,
    public imageUrl: string,
    public category: number,
    public description?: string,
    public quantityS?:number,
    public quantityM?:number,
    public quantityL?:number,
    public quantityXl?:number,
    public reviews?: Review[]
  ) {}
}
