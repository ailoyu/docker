import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {

  constructor(private route: ActivatedRoute, 
    private cartService: CartService,
    private productService: ProductService,
    private router: Router){}

    cartItems: { product: Product, quantity: number, size: number }[] = [];


  ngOnInit(): void {
    // Lấy danh sách sản phẩm từ giỏ hàng hiện tại
    debugger
    
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()); // lấy id sản phẩm trong giỏ hàng (Map)

    // Gọi service để lấy thông tin sản phẩm dựa trên danh sách ID
    debugger
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {            
        debugger
        this.cartItems = productIds.flatMap((productId) => {
          debugger
          const product = products.find((p) => p.id === productId);
          const cartEntries = cart.get(productId) || []; // Get all entries for the product ID
    
          // Map each entry to the desired format
          return cartEntries.map(entry => ({
            product: product!,
            quantity: entry.quantity,
            size: entry.size
          }));
        });
        console.log('haha');
      },
      complete: () => {
        debugger;
        this.calculateTotal();
        this.cartService.clearCart();
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      }
    });        
  }

  totalAmount: number = 0; // Tổng tiền

   // Hàm tính tổng tiền
   calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );
  }

  returnHomePage() {
    debugger
    // Điều hướng đến trang detail-product với productId là tham số
    this.router.navigate(['/']);
  }

  // home
  





}
