import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-admin-list-categories',
  templateUrl: './admin-list-categories.component.html',
  styleUrls: ['./admin-list-categories.component.scss']
})
export class AdminListCategoriesComponent {
  products: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // 10 items/ 1 trang
  pages: number [] = [];
  totalPages: number = 0;
  visiblePages: number [] = [];
  keyword: string = "";
  categories: Category[] = []; // Dữ liệu động từ CategoryService
  selectedCategoryId: number = 0; // Giá trị category được chọn

  constructor(private productService :ProductService,
    private categoryService: CategoryService,
    private router: Router
    ){}

  ngOnInit() {
      this.getCategories();
  }

  subMenuVisible = false;

  toggleSubMenu() {
    debugger
    this.subMenuVisible = !this.subMenuVisible;
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


  showInput: boolean = false;
  newCategoryName: string = '';
  category: Category = { id: 0, name: '' };

  addCategory() {
    debugger
    this.category.name = this.newCategoryName;
    this.categoryService.saveCategory(this.category)?.subscribe({
      next: (category) => {
        debugger
        alert("Thêm thể loại thành công");
        this.showInput = false;
        location.reload();
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger;
        alert("Thêm thể loại thất bại");
        this.showInput = false;
        location.reload();
      }
    });
    
    
  }
  

 
}
