import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { ProductImage } from 'src/app/model/product.image';
import { LoginResponse } from 'src/app/responses/user/login.response';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ProviderService } from 'src/app/service/provider.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.scss']
})
export class AdminEditComponent implements OnInit {
  product!: Product; // Initialize an empty product object

  productForm: FormGroup; //Dùng orderForm để validate dữ liệu nhập

  categories: Category[] = [];
  

  images: { file: File, base64: string }[] = [];
  sizes: number[] = [];
  quantity: number[] = [];

 

onFileChange(event: any) {
  const files: FileList = event.target.files;
  const newImages: { file: File, base64: string }[] = [];

  const readerPromises: Promise<any>[] = [];

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    const file = files[i];

    reader.onload = (e: any) => {
      newImages.push({
        file: file,
        base64: e.target.result
      });
    };
    
    // tạo một mảng `readerPromises` để lưu trữ các promise của mỗi lần đọc file.
    const readerPromise = new Promise<void>((resolve) => {
      reader.onloadend = () => {
        resolve();
      };
    });
    
    // tất cả các file đã được đọc
    reader.readAsDataURL(file);
    readerPromises.push(readerPromise); // lưu trữ các promise của mỗi lần đọc file.
  }

  // gán giá trị mới cho biến `images`

  Promise.all(readerPromises).then(() => {
    this.images = [...this.images, ...newImages];
  });
}

deleteImage(image: { file: File, base64: string }) {
  // Lọc ra các ảnh khác ảnh cần xóa và gán lại giá trị cho biến `images`
  this.images = this.images.filter(img => img !== image);
}
  


  constructor(private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private providerService: ProviderService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required], // fullname là FormControl bắt buộc      
      description: ['', [Validators.required]], // Sử dụng Validators.email cho kiểm tra định dạng email
      price: ['', [Validators.required]], // phone_number bắt buộc và ít nhất 6 ký tự
      category_id: ['', Validators.required],
      provider_id: ['', Validators.required],
      sizes: this.fb.array([]), // Create an empty FormArray

    });
    
  }

  productId: number = 0;


  ngOnInit(): void {
    this.getProviders();
    this.getCategories();
    this.route.paramMap.subscribe(params => {
      debugger
      const idParam = params.get('id');
      // Sử dụng giá trị của tham số ở đây

      if(idParam !== null){
        this.productId = +idParam;
      }
      if(this.productId !== 0){
        this.productService.getDetailProduct(this.productId).subscribe({
          next: (response : any) => {
            // Lấy danh sách sản phẩm và thay đổi URL
            debugger
            // response.product_images.forEach((product_image: ProductImage) => {
            //   product_image.image_url = `${environment.apiBaseUrl}/products/images/${product_image.image_url}`;
            // });
            
            debugger
            this.product = response
            this.product.provider_id = response.provider.id;
            console.log(this.product)

            // Bắt đầu với ảnh đầu tiên
            // this.showImage(0);
          },
          complete: () => {
            debugger;
            this.productForm = this.fb.group({
              name: [this.product.name, Validators.required], // fullname là FormControl bắt buộc      
              description: [this.product.description, [Validators.required]], // Sử dụng Validators.email cho kiểm tra định dạng email
              price: [this.product.price, [Validators.required]], // phone_number bắt buộc và ít nhất 6 ký tự
              category_id: [this.product.category_id, Validators.required],
              provider_id: [this.product.provider_id, Validators.required]
            });
            debugger
              const newImages: { file: File, base64: string }[] = [];
            
              const readerPromises: Promise<any>[] = [];

              for (let i = 0; i < this.product.product_images.length; i++) {
                newImages.push({
                  file: new File([], ''),
                  base64: this.product.product_images[i].image_url
                });
              }
              debugger

              this.images = newImages;
              
              // binding size
              let sizes: number[] = [];

              for (let i = 0; i < this.product.sizes.length; i++) {
                sizes.push(this.product.sizes[i]);
              }

              this.sizes = sizes;
              
              // binding quantity
              let quantity: number[] = [];

              for (let i = 0; i < this.product.quantity.length; i++) {
                quantity.push(this.product.quantity[i]);
              }

              this.quantity = quantity;

            
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

  providers: any[] = [];

  getProviders(){
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
        console.error("Lỗi bắt dữ liệu thể loại", error);
      }
    });
  }


  isLoading = false;

  

  saveProduct() {

    this.isLoading = true;

    this.loginResponse = this.userService.getUserResponseFromLocalStorage();

    debugger
    this.product = {
      ...this.product,
      ...this.productForm.value
    };
    this.product.employee_id = this.loginResponse!.employee_id;

    this.product.id = this.productId;
    this.product.sizes = this.sizes;
    this.product.quantity = this.quantity;

    this.product.images = this.images.map(image => image.base64);

    console.log(this.product);

    // // Call your product service to save the product
    this.productService.saveProduct(this.product)?.subscribe({
      next: (response) => {
        debugger
        alert("Thêm sản phẩm thành công");
        this.router.navigate(['/admin/edit-products', response.input_orders.detailInputOrders[0].product.id]);
        this.isLoading = false;
      },
      complete: () => {
      
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
        alert("Thêm sản phẩm thất bại");
        this.isLoading = false;
      }
    });
  }

 
  loginResponse!: LoginResponse | null;

  updateProduct() {
    this.isLoading = true;
    this.loginResponse = this.userService.getUserResponseFromLocalStorage();
    debugger  
    this.product = {
      ...this.product,
      ...this.productForm.value
    };
    this.product.employee_id = this.loginResponse!.employee_id;
    
    this.product.input_order_id = this.product.id;
    this.product.id = this.productId;
    this.product.sizes = this.sizes;
    this.product.quantity = this.quantity;

    
    this.product.images = this.images.map(image => image.base64);

    // Call your product service to save the product
    this.productService.updateProduct(this.product)?.subscribe({
      next: (response : any) => {
        debugger
        alert("Cập nhật sản phẩm thành công");
        location.reload();
        this.isLoading = false;
      },
      complete: () => {
      
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
        alert("Cập nhật sản phẩm thất bại");
        this.isLoading = false;
      }
    });

  }

  addSize() {
    const randomSize = (Math.floor(Math.random() * 23) + 70) / 2;
    const randomQuantity = Math.floor(Math.random() * 11) + 5;
    this.sizes.push(randomSize)
    this.quantity.push(randomQuantity);
  }

  removeSize(index: number) {
    this.sizes.splice(index, 1);
    this.quantity.splice(index, 1);
  }

  onSizeChange() {
    console.log(this.sizes);
  }

  
  
}
