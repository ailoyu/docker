import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';



interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}
@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss']
})
export class NewArrivalsComponent implements OnInit{

  categories: any[] =  [];
  bestSellers: any[] = [];
  newProducts: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ){
    this.getAllBestSellers();
    this.getNewProducts();
  }

  getNewProducts(){
    this.productService.getNewProducts().subscribe({
      next: (response: any) => {
        debugger
        this.newProducts = response;
        // for (let i = 0; i < this.products.length && i < this.imagesnicexu.length; i++) {
        //   this.imagesnicexu[i].imageSrc = this.products[i].thumbnail;
        // }
      },
      complete: () => {

      },
      error:(error: any) => {

      }
    })
  }

  onProductClick(productId: number) {
    debugger
    // Điều hướng đến trang detail-product với productId là tham số
    this.router.navigate(['/detail-product', productId]);
  }

  getAllBestSellers(){
    this.productService.getAllBestSellers().subscribe({
      next: (response: any) => {
        debugger
        this.bestSellers = response;
        // for (let i = 0; i < this.products.length && i < this.imagesnicexu.length; i++) {
        //   this.imagesnicexu[i].imageSrc = this.products[i].thumbnail;
        // }
      },
      complete: () => {

      },
      error:(error: any) => {

      }
    });
  }


  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (categories: any[]) => {
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

  
  
  @Input() images: carouselImage[] = []
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000; // Default to 3 seconds

  selectedIndex = 0;

  ngOnInit(): void {
    this.getCategories();
    if(this.autoSlide) {
      this.autoSlideImages();
    }
  }


  // Changes slide in every 3 seconds
  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  // sets index of image on dot/indicator click
  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if(this.selectedIndex === 0) {
      this.selectedIndex = this.imagesnicexu.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if(this.selectedIndex === this.imagesnicexu.length -1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  title = 'carousel';

  imagesnicexu = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1460627390041-532a28402358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1640844444545-66e19eb6f549?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imageAlt: 'person2',
    },
  ]
}
