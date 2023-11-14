import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { environment } from "../environments/environment";
import { Product } from "../model/product";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class DataAnalytics {
    private apiGetDataAnalytics = `${environment.apiBaseUrl}/data-analytics`;

    constructor(private http: HttpClient){}

  getCategoryStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiGetDataAnalytics}/category-statistics`);
  }
  getProviderStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiGetDataAnalytics}/provider-statistics`);
  }
  getOrderStatusStatistic(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiGetDataAnalytics}/order-status-statistics`);
  }
  getSizesStatistic(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiGetDataAnalytics}/size-statistics`);
  }
  getRevenue(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiGetDataAnalytics}/revenue-statistics`);
  }
  getPriceStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiGetDataAnalytics}/price-statistics`);
  }
  getQuantityOfEachProductStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiGetDataAnalytics}/product-statistics`);
  }
}