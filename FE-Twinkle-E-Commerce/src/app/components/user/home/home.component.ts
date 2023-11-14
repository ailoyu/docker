import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from 'src/app/service/loading.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // apiPrefix: string = "http://localhost:4200/";
  apiPrefix: string = "https://twinklee.netlify.app/";

  products: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 12; // 10 items/ 1 trang
  keyword: string = "";
  selectedCategoryId: number = 0; // Giá trị category được chọn


  constructor(
    private productService: ProductService,
    private el: ElementRef,
    private router: Router,
    public loadingService: LoadingService, // Change private to public
  ) {}

  onProductClick(productId: number) {
    debugger
    // Điều hướng đến trang detail-product với productId là tham số
    this.router.navigate(['/detail-product', productId]);
  }


  ngOnInit(): void {
    // Check if it's the initial load
    // this.loadingService.initialLoad$.subscribe((initialLoad) => {
    //   if (initialLoad) {
    //     // This block will execute only on the initial load
    //     // ... your initial load logic here ...
    //   }
    // });

    // // Subscribe to router events to detect navigation
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Check if it's not the initial load
    //     this.loadingService.initialLoad$.subscribe((initialLoad) => {
    //       if (!initialLoad) {
    //         // This block will execute on subsequent navigations
    //         // ... your navigation-specific logic here ...
    //       }
    //     });
    //   }
    // });


    // Test 1
    // this.loadingService.manualShowWithDuration(this.loadingService.initialLoadDuration, true);
    // Test 2
    

  }
}
