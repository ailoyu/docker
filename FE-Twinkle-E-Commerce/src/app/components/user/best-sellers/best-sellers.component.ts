import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.scss'],
})
export class BestSellersComponent implements OnInit {
  
  nikes: any[] = [];
  converses: any[] = [];
  pumas: any[] = [];
  vans: any[] = [];
  newBalances: any[] = [];
  adidases: any[] = [];
  reeboks: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ){

  }
    

  ngOnInit(): void {
    this.getProductByBrand("Nike");
    this.getProductByBrand("Converse");
    this.getProductByBrand("Puma");
    this.getProductByBrand("Vans");
    this.getProductByBrand("New Balance");
    this.getProductByBrand("Adidas");
    this.getProductByBrand("Reebok");

  }

  getProductByBrand(brand: string){
    this.productService.getProductByBrand(brand).subscribe({
      next: (response: any) => {
        debugger
        if(brand === "Nike"){
          this.nikes = response;
        } else if(brand === "Converse"){
          this.converses = response;
        } else if(brand === "Puma"){
          this.pumas = response;
        } else if(brand === "Vans"){
          this.vans = response;
        } else if(brand === "New Balance"){
          this.newBalances = response;
        } else if(brand == "Adidas"){
          this.adidases = response;
        } else if(brand == "Reebok"){
          this.reeboks = response;
        }
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger
        console.error('Lỗi bắt dữ liệu detail product', error);
      }
    });
  }


  onProductClick(productId: number) {
    debugger
    // Điều hướng đến trang detail-product với productId là tham số
    this.router.navigate(['/detail-product', productId]);
  }
  
}
