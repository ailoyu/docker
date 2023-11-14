import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { ProductImage } from 'src/app/model/product.image';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ProviderService } from 'src/app/service/provider.service';

@Component({
  selector: 'app-admin-edit-provider',
  templateUrl: './admin-edit-provider.component.html',
  styleUrls: ['./admin-edit-provider.component.scss']
})
export class AdminEditProviderComponent {

  // product!: Product; // Initialize an empty product object

  productForm: FormGroup; //Dùng orderForm để validate dữ liệu nhập

  // categories: Category[] = [];
  

  // images: { file: File, base64: string }[] = [];
  // sizes: number[] = [];
  // quantity: number[] = [];

  provider: any;

  subMenuVisible = false;

  toggleSubMenu() {
    debugger
    this.subMenuVisible = !this.subMenuVisible;
  }
  


  constructor(private providerService: ProviderService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
      this.productForm = this.fb.group({
        name: ['', Validators.required], // fullname là FormControl bắt buộc      
        description: ['', [Validators.required]], // Sử dụng Validators.email cho kiểm tra định dạng email
        phoneNumber: ['', [Validators.required]],
        address: ['', Validators.required],
        email: ['', [Validators.required]],
        website: ['', [Validators.required]]
      });
  }

  providerId: number = 0;


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      debugger
      const idParam = params.get('id');
      // Sử dụng giá trị của tham số ở đây

      if(idParam !== null){
        this.providerId = +idParam;
      }
      if(this.providerId !== 0){
        this.providerService.getDetailProviders(this.providerId).subscribe({
          next: (response : any) => {
            // Lấy danh sách sản phẩm và thay đổi URL
            debugger
            // response.product_images.forEach((product_image: ProductImage) => {
            //   product_image.image_url = `${environment.apiBaseUrl}/products/images/${product_image.image_url}`;
            // });
            
            debugger
            this.provider= response.provider;
            console.log(this.provider)

            this.productForm = this.fb.group({
              name: [this.provider.name, Validators.required], // fullname là FormControl bắt buộc      
              description: [this.provider.description, [Validators.required]], // Sử dụng Validators.email cho kiểm tra định dạng email
              phoneNumber: [this.provider.phoneNumber, [Validators.required]],
              address: [this.provider.address, Validators.required],
              email: [this.provider.email, [Validators.required]],
              website: [this.provider.website, [Validators.required]]
            });
          },
          complete: () => {
            debugger;
          
          },
          error: (error: any) => {
            debugger
            console.error('Lỗi bắt dữ liệu detail product', error);
          }
        });
      } else {
        console.error('Invalid productId', idParam);
      }
    });
  }


  isLoading = false;

  

  saveProduct() {

    this.isLoading = true;

    debugger
    this.provider = {
      ...this.provider,
      ...this.productForm.value
    };

    this.provider.phone_number = this.provider.phoneNumber;
    

    // Call your product service to save the product
    this.providerService.saveProvider(this.provider)?.subscribe({
      next: (response : any) => {
        debugger
        alert("Thêm nhà cung cấp thành công");
        this.router.navigate(['/admin/edit-providers', response.provider.id]);
        this.isLoading = false;
      },
      complete: () => {
      
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
        alert("Thêm nhà cung cấp thất bại");
        this.isLoading = false;
      }
    });
  }


  updateProduct() {
    this.isLoading = true;

    debugger
    this.provider = {
      ...this.provider,
      ...this.productForm.value
    };
    this.provider.phone_number = this.provider.phoneNumber;
    this.provider.id = this.providerId;

    // Call your product service to save the product
    this.providerService.updateProduct(this.provider)?.subscribe({
      next: (response) => {
        
        alert("Cập nhật nhà cung cấp thành công");
        this.isLoading = false;
      },
      complete: () => {
      
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
        alert("Cập nhật nhà cung cấp thất bại");
        this.isLoading = false;
      }
    });

  }
}
