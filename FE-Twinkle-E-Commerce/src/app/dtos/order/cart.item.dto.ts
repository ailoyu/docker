import { IsNumber } from 'class-validator';

export class CartItemDTO {
    @IsNumber()
    product_id: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    size: number;

    constructor(data: any) {
        this.product_id = data.product_id;
        this.quantity = data.quantity;
        this.size = data.size;
    }
}
