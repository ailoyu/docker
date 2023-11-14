import { ProductImage } from "./product.image";
import { Size } from "./size";

export interface Product {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    images: string[];
    sizes: number[];
    quantity: number[];
    description: string;
    category_name: string;
    category_id: number;
    provider_id: number;
    employee_id: number;
    input_order_id: number;
    url: string;
    product_images: ProductImage[];
}