import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class VNPayService {
  constructor(private http: HttpClient, private router: Router) {}
  listQuantity: number[] = [];
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${environment.apiBaseUrl}/${endpoint}`;
  }

  getPayment(price: number, userId: number): Observable<string> {
    let params = new HttpParams()
      .set('price', price.toString())
      .set('userId', userId.toString());
    return this.http.get(this.getFullUrl('products/pay'), {
      params,
      responseType: 'text', // Yêu cầu response dưới dạng văn bản
    });
  }
  
}