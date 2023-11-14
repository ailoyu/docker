import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CartItemDTO } from 'src/app/dtos/order/cart.item.dto';
import { environment } from 'src/app/environments/environment';
import { LoginResponse } from 'src/app/responses/user/login.response';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { TokenService } from 'src/app/service/token.service';



@Component({
  selector: 'app-admin-order-confirm',
  templateUrl: './admin-order-confirm.component.html',
  styleUrls: ['./admin-order-confirm.component.scss']
})
export class AdminOrderConfirmComponent implements OnInit{
  constructor(private tokenService: TokenService,
    private orderService: OrderService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private orderSerivce: OrderService){}

  cart_items!: CartItemDTO[]; // Thêm cart_items để lưu thông tin giỏ hàng
  

  phoneNumber!: string;
  loginResponse$!: Observable<LoginResponse> | null;
  loginResponse!: LoginResponse | null;
  getOrder: any[] = [];
  getCancelledOrder: any[] = [];

  selectedOrder: number | null = null;

    toggleBodyAndFooter(orderId: number) {
        if (this.selectedOrder === orderId) {
            this.selectedOrder = null;
        } else {
            this.selectedOrder = orderId;
        }
    }
  
    status!: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {


      this.status = params.get('status')!;
      // Sử dụng giá trị của tham số ở đây

      switch (this.status) {
        case 'pending':
        case null:
          this.getAdminOrders('pending');
          break;
        case 'shipping':
          this.getAdminOrders('shipping');
          break;
        case 'delivered':
          this.getAdminOrders('delivered');
          break;
        case 'cancelled':
          this.getAdminOrders('cancelled');
          break;
        default:
          // Code to be executed if none of the cases match
          break;
      }
    
  });
  }

  getAdminOrders(status: string){
    // Lấy sdt từ token ra -> gọi api getOrderByPhoneNumber (lịch sử đơn hàng)
    this.loginResponse$ = this.tokenService.displayUserInformation();
  
    this.loginResponse$?.subscribe(response => {
      this.loginResponse = { ...response };
  
      this.orderService.getAdminOrders(status)?.subscribe((orders: any[]) => {
          // this.getOrder = orders;
          // console.log(this.getOrder);
          this.getOrder = orders.map(order => ({
            ...order,
            orderDate: this.parseDate(order.orderDate),
            shippingDate: this.parseDate(order.shippingDate)
          }));

          // Hủy (đặt cờ để hiện checkbox, và nút xóa)
          this.getCancelledOrder = (status === 'cancelled') ? this.getOrder : [];
          console.log(this.getOrder);
        });
    });
  }

  parseDate(date: number): string {
    const parsedDate = new Date(date);

    const formattedDate = this.datePipe.transform(parsedDate, 'HH:mm:ss') === '00:00:00' ?
    this.datePipe.transform(parsedDate, 'dd-MM-YYYY') :
    this.datePipe.transform(parsedDate, 'dd-MM-YYYY HH:mm:ss');

    return formattedDate || '';
  }
  
  // parseThumbnail(thumbnail: string): string{
  //   debugger
  //   thumbnail =  `${environment.apiBaseUrl}/products/images/` + thumbnail;
  //   return thumbnail;
  // }

  onProductClick(productId: number) {
    debugger
    // Điều hướng đến trang detail-product với productId là tham số
    this.router.navigate(['/detail-product', productId]);
  }


  confirmOrder(orderId: number, status: string){
    this.orderService.updateOrder(orderId, status)?.subscribe({
      next: (response : any) => {
        debugger
        switch(response.status){
          case 'Đang vận chuyển':
            alert("Xác nhận đơn hàng thành công!");
            break;
          case 'Đã giao hàng':
            alert("Giao đơn hàng thành công!");
            break;
          case 'Đã hủy':
            alert("Hủy đơn hàng thành công!");
            break;
          default:
            // Code to be executed if none of the cases match
            break;
        }
        location.reload();
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger
        alert("Xác nhận đơn hàng thất bại!");
      }
    });
  }

  cancelOrder(){
    
  }

  isCancelledRoute(): boolean {
    return this.router.url === '/admin/order-confirm/cancelled';
  }

  deleteSelectedOrders() {
    debugger
    console.log(this.selectedIds);
    this.orderSerivce.deleteOrders(this.selectedIds)?.subscribe({
      next: (product) => {
        
        alert("Xóa đơn hàng thành công!");
        location.reload();
      },
      complete: () => {
      
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
        alert("Xóa đơn hàng thất bại!");
      }
    });
  }

  selectedIds: number[] = [];


  toggleSelection(id: number) {
    const index = this.selectedIds.indexOf(id);
    if (index > -1) {
      this.selectedIds.splice(index, 1); // Remove ID if already selected
    } else {
      this.selectedIds.push(id); // Add ID if not selected
    }
  }

  toggleAllCheckboxes() {
    const checkboxes = document.getElementsByName('foo');
    const checkAllCheckbox = document.getElementById('checkAll') as HTMLInputElement;
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
    checkbox.checked = checkAllCheckbox.checked;

    if (checkbox.checked) {
      const productId =  parseInt(checkbox.value, 10); // Convert to number
      this.toggleSelection(productId);
    }
    }
  }

  


}
