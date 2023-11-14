import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ProviderService } from 'src/app/service/provider.service';

@Component({
  selector: 'app-admin-list-providers',
  templateUrl: './admin-list-providers.component.html',
  styleUrls: ['./admin-list-providers.component.scss']
})
export class AdminListProvidersComponent {
  providers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // 10 items/ 1 trang
  pages: number [] = [];
  totalPages: number = 0;
  visiblePages: number [] = [];
  keyword: string = "";
  address: string = "0";
  addresses: string[] = []; // Dữ liệu động từ CategoryService
  selectedCategoryId: number = 0; // Giá trị category được chọn

  constructor(private providerService :ProviderService,
    private router: Router
    ){}

  ngOnInit() {
      this.getProviders(this.keyword, this.address, this.currentPage, this.itemsPerPage);
      
  }

  subMenuVisible = false;

  toggleSubMenu() {
    debugger
    this.subMenuVisible = !this.subMenuVisible;
  }

  calculateTotalQuantity(quantities: number[]): number {
    return quantities.reduce((total, quantity) => total + quantity, 0);
  }

  

  

  searchProducts(){
    this.currentPage = 1;
    this.itemsPerPage = 5;
    debugger
    this.getProviders(this.keyword, this.address, this.currentPage, this.itemsPerPage);
  }

  getProviders(keyword: string, address: string, page: number, limit: number){
    this.providerService.getProviders(keyword, address, page, limit).subscribe({
      next: (response: any) => {
        debugger
        this.providers = response.providers;
        this.providers.forEach(provider => {
          if (provider.address && !this.addresses.includes(provider.address)) {
            this.addresses.push(provider.address);
          }
        });
        this.totalPages = response.totalPage;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error("Lỗi bắt dữ liệu sản phẩm", error);
      }
    });
  }

  onPageChange(page: number){
    debugger;
    this.currentPage = page;
    this.getProviders(this.keyword, this.address, this.currentPage, this.itemsPerPage);
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
   onProductClick(providerId: number) {
    debugger
    // Điều hướng đến trang detail-product với providerId là tham số
    this.router.navigate(['/admin/edit-providers', providerId]);
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

  deleteSelectedProviders() {
    debugger
    console.log(this.selectedIds);
    this.providerService.deleteProviders(this.selectedIds)?.subscribe({
      next: (provider: any) => {
        
        alert("Xóa thương hiệu thành công");
        location.reload();
      },
      complete: () => {
      
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
        alert("Xóa thương hiệu thất bại");
      }
    });
  }
}
