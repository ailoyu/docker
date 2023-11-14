import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CartItemDTO } from 'src/app/dtos/order/cart.item.dto';
import { OrderDTO } from 'src/app/dtos/order/order.dto';
import { environment } from 'src/app/environments/environment';
import { LoginResponse } from 'src/app/responses/user/login.response';
import { OrderService } from 'src/app/service/order.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-admin-edit-customer',
  templateUrl: './admin-edit-customer.component.html',
  styleUrls: ['./admin-edit-customer.component.scss']
})
export class AdminEditCustomerComponent implements OnInit {
  constructor(private tokenService: TokenService,
    private orderService: OrderService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router){}

  cart_items!: CartItemDTO[]; // Thêm cart_items để lưu thông tin giỏ hàng
  

  phoneNumber!: string;
  loginResponse$!: Observable<LoginResponse> | null;
  loginResponse!: LoginResponse | null;
  getOrder: any[] = [];
  totalValueOfOrders: number = 0;

  selectedOrder: number | null = null;

    toggleBodyAndFooter(orderId: number) {
        if (this.selectedOrder === orderId) {
            this.selectedOrder = null;
        } else {
            this.selectedOrder = orderId;
        }
    }

    userId!: number;

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      debugger
      const idParam = params.get('id');
      // Sử dụng giá trị của tham số ở đây

      if(idParam !== null){
        this.userId = +idParam;
        this.orderService.getOrderByUserId(this.userId)?.subscribe((orders: any[]) => {
          // this.getOrder = orders;
          // console.log(this.getOrder);
          this.getOrder = orders.map(order => ({
            ...order,
            orderDate: this.parseDate(order.orderDate),
            shippingDate: this.parseDate(order.shippingDate)
          }));
          for (const order of orders) {
            let totalValue = 0;
            for (const orderDetail of order.orderDetails) {
              totalValue += orderDetail.productPrice * orderDetail.numberOfProducts;
            }
            this.totalValueOfOrders += totalValue;
          }
          debugger
          console.log(this.getOrder);
        });
      }
      
    
      
      });
  
  }

  parseDate(date: number): string {
    const parsedDate = new Date(date);

    const formattedDate = this.datePipe.transform(parsedDate, 'HH:mm:ss') === '00:00:00' ?
    this.datePipe.transform(parsedDate, 'dd-MM-YYYY') :
    this.datePipe.transform(parsedDate, 'dd-MM-YYYY HH:mm:ss');

    return formattedDate || '';
  }

  onProductClick(productId: number) {
    debugger
    // Điều hướng đến trang detail-product với productId là tham số
    this.router.navigate(['/detail-product', productId]);
  }
}
