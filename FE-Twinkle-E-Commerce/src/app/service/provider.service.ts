import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ProviderService{
    
    private apiProviders = `${environment.apiBaseUrl}/providers`;

    constructor(private http: HttpClient){}

    getProviders(keyword:string, address: string,
        page: number, limit: number): Observable<any[]>{
        const params = new HttpParams()
        .set('keyword', keyword)
        .set('address', address)
        .set('page', page.toString())
        .set('limit', limit.toString());
        return this.http.get<any[]>(`${this.apiProviders}/get-providers-by-filter`, {params});
    }

    getDetailProviders(providerId: number){
        return this.http.get(`${environment.apiBaseUrl}/providers/${providerId}`);
    }

    getAllProviders(){
        return this.http.get(this.apiProviders);
    }

    

      saveProvider(provider: any): Observable<any>{
        debugger
        return this.http.post(this.apiProviders, provider);
    }


    updateProduct(provider: any): Observable<any>{
        debugger
        return this.http.put(`${environment.apiBaseUrl}/providers/` + provider.id, provider);
    }

    deleteProviders(selectedIds: number[]): Observable<any>{
        debugger
        const options = {
            body: { ids: selectedIds }
          };
        return this.http.delete(`${environment.apiBaseUrl}/providers/`, options);
    }


}