import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from '../components/models/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  urlProducts: string = 'http://localhost:3000/products';
  urlUsers: string = 'http://localhost:3000/users';
  urlCart: string = 'http://localhost:3000/cart';
  urlRecentlyProducts: string = 'http://localhost:3000/recentlyProducts';

  getAllProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.urlProducts);
  }
  getRecentlyProducts() {
    return this.http.get<IProducts[]>(this.urlRecentlyProducts);
  }
  getSingleProduct(id: number) {
    return this.http.get<IProducts>(`${this.urlProducts}/${id}`);
  }
}
