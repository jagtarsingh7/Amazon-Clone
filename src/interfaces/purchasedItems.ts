import { Product } from "./product";

export interface IPurchasedItems {
    _id: string; // Replace string with the appropriate type for ObjectId in your application
    name: string;
    email: string;
    phone:string;
    address: {
      line1: string;
      postal_code: string;
      city: string;
      state: string;
      country: string;
      _id: string; // Replace string with the appropriate type for ObjectId in your application
    };
    product: Product[]; // Adjust the type according to the structure of your 'product' property
    __v: number;
  }
  