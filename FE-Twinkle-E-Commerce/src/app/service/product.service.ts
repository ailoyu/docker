import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../model/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    
    private apiProducts = `${environment.apiBaseUrl}/products`;

    constructor(private http: HttpClient){}

    getProducts(keyword:string, categoryId: number,
        size: number, orderBy: string,
        selectedPriceRate: string,
        selectedProvider: string,
        page: number, limit: number): Observable<Product[]>{
        const params = new HttpParams()
        .set('keyword', keyword)
        .set('size', size)
        .set('order_by', orderBy)
        .set('category_id', categoryId)
        .set('selected_price_rate', selectedPriceRate)
        .set('selected_provider', selectedProvider)
        .set('page', page.toString())
        .set('limit', limit.toString());
        return this.http.get<Product[]>(this.apiProducts, {params});
    }

    getDetailProduct(productId: number){
        return this.http.get(`${environment.apiBaseUrl}/products/${productId}`);
    }

    getAvailableSizes(){
        return this.http.get(`${environment.apiBaseUrl}/products/get-all-available-sizes`);
    }

    getProductsByIds(productIds: number[]): Observable<Product[]> {
        // Chuyển danh sách ID thành một chuỗi và truyền vào params
        // ids = 1,2,3,4,5
        debugger
        const params = new HttpParams().set('ids', productIds.join(',')); 
        return this.http.get<Product[]>(`${this.apiProducts}/by-ids`, { params });
    }

      private apiInputOrder = `${environment.apiBaseUrl}/input_orders`;

      saveProduct(product: any): Observable<any>{
        debugger
        return this.http.post(this.apiInputOrder, product);
    }

    getAllBestSellers(): Observable<any>{
        return this.http.get(`${environment.apiBaseUrl}/products/best-sellers`);
    }

    getNewProducts(): Observable<any>{
        return this.http.get(`${environment.apiBaseUrl}/products/new-products`);
    }

    getProductByCategory(productId: number){
        return this.http.get(`${environment.apiBaseUrl}/products/products-from-category/${productId}`);
    }

    getProductByBrand(brand: string){
        return this.http.get(`${environment.apiBaseUrl}/products/products-from-brand/${brand}`);
    }




    updateProduct(product: any): Observable<any>{
        debugger
        return this.http.put(`${environment.apiBaseUrl}/input_orders/` + product.input_order_id, product);
    }

    deleteProducts(selectedIds: number[]): Observable<any>{
        debugger
        const options = {
            body: { ids: selectedIds }
          };
        return this.http.delete(`${environment.apiBaseUrl}/products/`, options);
    }


}