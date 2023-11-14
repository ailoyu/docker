import { EventEmitter, Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { environment } from "../environments/environment";
import { Product } from "../model/product";


@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart: Map<number, { quantity: number; size: number }[]> = new Map();

    constructor(private productService: ProductService) {
    // Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        this.cart = new Map<number, { quantity: number; size: number }[]>(JSON.parse(storedCart));
    }
    }

    addToCart(productId: number, quantity: number = 1, size: number): void {
    debugger
    if (this.cart.has(productId)) {
        const existingCartItems = this.cart.get(productId)!;

        // Check if there's an existing cart item with the specified size
        const existingCartItem = existingCartItems.find(item => item.size === size);

        if (existingCartItem) {
        // If size exists, update the quantity for the specific size
        existingCartItem.quantity += quantity;
        } else {
        // If size does not exist, add a new entry with the given size and quantity
        existingCartItems.push({ quantity, size });
        }
    } else {
        // If the product is not in the cart, add a new entry with the given size and quantity
        this.cart.set(productId, [{ quantity, size }]);
    }
    console.log(this.cart);
    // Sau khi thay đổi giỏ hàng xong, lưu vào localStorage
    this.cartUpdated.emit();
    this.saveCartLocalStorage();
    }

    getCart(): Map<number, { quantity: number; size: number }[]> {
        return this.cart;
    }

    cartUpdated = new EventEmitter<void>();

    getCartNumber(): number {
        // Assuming this.cart is of type Map<number, { quantity: number; size: number }[]>
        debugger
        let totalItems = 0;
    
        // Iterate through each entry in the cart
        for (const [, items] of this.cart) {
            // Iterate through each item in the array
            for (const item of items) {
                // Add the quantity of each item to the total
                totalItems += item.quantity;
            }
        }
        
        return totalItems;
    }

    // lưu giỏ hàng vào localStorage
    private saveCartLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }

    // xóa giỏ hàng và cập nhật localStorage
    clearCart(): void {
    this.cart.clear(); // Xóa toàn bộ dữ liệu trong giỏ hàng
    this.saveCartLocalStorage(); // lưu giỏ hàng rỗng mới xóa vào LocalStorage lại
    }

    

}