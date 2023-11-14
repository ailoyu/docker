import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { Role } from 'src/app/model/role';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-list-users',
  templateUrl: './admin-list-users.component.html',
  styleUrls: ['./admin-list-users.component.scss']
})
export class AdminListUsersComponent {
  products: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // 10 items/ 1 trang
  pages: number [] = [];
  totalPages: number = 0;
  visiblePages: number [] = [];
  keyword: string = "";
  phoneNumber: string = "";
  categories: Category[] = []; // Dữ liệu động từ CategoryService
  
  selectedCategoryId: number = 0; // Giá trị category được chọn
  selectedRoleId: number = 0;

  constructor(private productService :ProductService,
    private categoryService: CategoryService,
    private roleService: RoleService,
    private userService: UserService,
    private datePipe: DatePipe,
    private router: Router
    ){}

  roles: Role[] = []; // Mảng roles
  selectedRole: Role | undefined; // Biến để lưu giá trị được chọn từ dropdown

  ngOnInit() {
      // this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
      this.getUsers(this.keyword, this.phoneNumber, this.selectedRoleId, this.currentPage, this.itemsPerPage);
      this.getCategories();
      this.roleService.getRoles().subscribe({
        next: (roles: Role[]) => { // Sử dụng kiểu Role[]
          debugger
          this.roles = roles; // hiển thị danh sách roles ra client
  
          // lấy role đầu tiên làm default hiện ra,
          // this.selectedRole = roles.length > 0 ? roles[0] : undefined; 
        },
        error: (error: any) => {
          debugger
          console.error('Error getting roles:', error);
        }
      });
  }

  subMenuVisible = false;

  toggleSubMenu() {
    debugger
    this.subMenuVisible = !this.subMenuVisible;
  }

  calculateTotalQuantity(quantities: number[]): number {
    return quantities.reduce((total, quantity) => total + quantity, 0);
  }

  

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        debugger 
        this.categories = categories;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error("Lỗi bắt dữ liệu thể loại", error);
      }
    });
  }

  searchUsers(){
    this.currentPage = 1;
    this.itemsPerPage = 5;
    debugger
    this.getUsers(this.keyword, this.phoneNumber, this.selectedRoleId, this.currentPage, this.itemsPerPage);
  }

  
  users: any[] = [];

  getUsers(keyword: string, phoneNumber: string, selectedRole: number, page: number, limit: number){
    this.userService.getUsers(keyword, phoneNumber, selectedRole!, page, limit).subscribe({
      next: (response: any) => {
        debugger
        // response.products.forEach((product : Product) => {
        //   product.url = product.thumbnail;
        // });
        // debugger
        // this.products = response.products;
        // this.totalPages = response.totalPage;
        this.users = response.users;
        console.log(this.users);
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, response.totalPage);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error("Lỗi bắt dữ liệu sản phẩm", error);
      }
    })
  }

  parseDateFromString(dateString: string): Date {
    const parts = dateString.split(',').map(part => parseInt(part, 10));
    // The month in JavaScript's Date starts from 0, so subtract 1 from the month
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
  }
  

  onPageChange(page: number){
    debugger;
    this.currentPage = page;
    this.getUsers(this.keyword, this.phoneNumber, this.selectedRoleId, this.currentPage, this.itemsPerPage);
  }
  

  generateVisiblePageArray(currentPage: number, totalPages: number): number[]{
    const maxVisiblePages = 5; // cho hiện ra 5 trang để chọn
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if(endPage - startPage + 1 < maxVisiblePages){
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }
   // Hàm xử lý sự kiện khi sản phẩm được bấm vào
   onProductClick(productId: number) {
    debugger
    // Điều hướng đến trang detail-product với productId là tham số
    this.router.navigate(['/admin/edit-products', productId]);
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

  deleteSelectedProducts() {
    debugger
    console.log(this.selectedIds);
    this.userService.deleteUsers(this.selectedIds)?.subscribe({
      next: (user) => {
        
        alert("Kích hoạt/vô hiệu hóa thành công");
        location.reload();
      },
      complete: () => {
      
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
        alert("Xóa users thất bại");
      }
    });
  }
}
