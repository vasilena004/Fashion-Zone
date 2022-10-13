import { IdType } from "./user";

enum Size{
    "S"=0,
    "M",
    "L",
    "XL"
}

enum Category{
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

export interface Product{
    id:IdType,
    productName:string;
    productCode:string;
    color:Color;
    price:number;
    imageUrl:string;
    category:Category;
    description?:string;
    quantityS?:number,
    quantityM?:number,
    quantityL?:number,
    quantityXl?:number,
    reviews?:Review[]
}