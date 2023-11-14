// Test 1
import { Component, OnInit, AfterViewInit } from '@angular/core';
// End test 1
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { LoadingService } from 'src/app/service/loading.service';
import { ProductService } from 'src/app/service/product.service';
import { ProviderService } from 'src/app/service/provider.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit{
  // Test 1
  ngAfterViewInit() {
      // Ensure that the loading animation is triggered after the component is fully initialized
      this.loadingService.manualShowWithDuration(this.loadingService.subsequentLoadDuration, true);
  }
  // End test 1

  showFilter = false;

  
  products: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9 // 10 items/ 1 trang
  pages: number [] = [];
  totalPages: number = 0;
  visiblePages: number [] = [];
  keyword: string = "";
  categories: Category[] = []; // Dữ liệu động từ CategoryService
  selectedCategoryId: number = 0; // Giá trị category được chọn
  selectedPriceRate: string = "";
  selectedProvider: string = "";
  orderBy: string = "asc";
  selectedSize: number = 0;
  sizes: number[] = [];
  providers: any[] = [];

  constructor(private productService :ProductService,
    private categoryService: CategoryService,
    private providerService: ProviderService,
    private router: Router,
    public loadingService: LoadingService
    ){}

  ngOnInit() {
    // Test 1
    this.loadingService.clearLocalStorage();
    this.loadingService.manualShowWithDuration(this.loadingService.subsequentLoadDuration, true);
    // End test 1

    
    

    // Subscribe to router events to detect navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if it's not the initial load
        this.loadingService.initialLoad$.subscribe((initialLoad) => {
          if (!initialLoad) {
            // This block will execute on subsequent navigations
            // ... your navigation-specific logic here ...
          }
        });
      }
    });

      this.getProducts(
      this.keyword,
      this.selectedCategoryId,
      this.selectedSize,
      this.orderBy,
      this.selectedPriceRate,
      this.selectedProvider,
      this.currentPage,
      this.itemsPerPage);

      this.getCategories();
      this.getAvailableSizes();
      this.getAllProviders();
      // Check if it's the initial load
    this.loadingService.initialLoad$.subscribe((initialLoad) => {
      if (initialLoad) {
        // This block will execute only on the initial load
        // ... your initial load logic here ...
      }
    });

}
  
  getAllProviders(){
    this.providerService.getAllProviders().subscribe({
      next: (response: any) => {
        debugger 
        this.providers = response;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        
      }
    })
  }

  getAvailableSizes(){
    this.productService.getAvailableSizes().subscribe({
      next: (response: any) => {
        debugger 
        this.sizes = response.sizes;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        
      }
    })
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

  searchProducts(){
    this.currentPage = 1;
    this.itemsPerPage = 9;
    debugger
    
    this.getProducts(this.keyword, this.selectedCategoryId, this.selectedSize, this.orderBy, this.selectedPriceRate, this.selectedProvider, this.currentPage, this.itemsPerPage);
  }

  getProducts(keyword: string, selectedCategoryId: number, selectedSize: number, orderBy: string, selectedPriceRate: string, selectedProvider: string, page: number, limit: number){
    this.productService.getProducts(keyword, selectedCategoryId, selectedSize, orderBy, selectedPriceRate, selectedProvider,  page, limit).subscribe({
      next: (response: any) => {
        
        response.products.forEach((product : Product) => {
          product.url = product.thumbnail;
        });
        debugger
        
        this.products = response.products;
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
    this.getProducts(this.keyword, this.selectedCategoryId, this.selectedSize, this.orderBy, this.selectedPriceRate, this.selectedProvider, this.currentPage, this.itemsPerPage);
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
    this.router.navigate(['/detail-product', productId]);
  }

}
