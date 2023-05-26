import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from '../components/models/products';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  urlProducts: string = 'http://localhost:4000/products';
  urlCart: string = 'http://localhost:4000/cart';
  urlRecentlyProducts: string = 'http://localhost:4000/recentlyProducts';

  getAllProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.urlProducts);
  }
  getSingleProduct(id: number) {
    return this.http.get<IProducts>(`${this.urlProducts}/${id}`);
  }

  postProductToRecently(product: IProducts) {
    return this.http.post<IProducts>(this.urlRecentlyProducts, product);
  }
  getRecentlyProducts() {
    return this.http.get<IProducts[]>(this.urlRecentlyProducts);
  }
  deleteProductFromRecent(id: number) {
    return this.http.delete<any>(`${this.urlRecentlyProducts}/${id}`);
  }

  postProductToCart(product: IProducts) {
    return this.http.post<IProducts>(this.urlCart, product);
  }
  getProductFromCart() {
    return this.http.get<IProducts[]>(this.urlCart);
  }
  updateProductToCart(product: IProducts) {
    return this.http.put<IProducts>(`${this.urlCart}/${product.id}`, product);
  }
  deleteProductFromCart(id: number) {
    return this.http.delete<any>(`${this.urlCart}/${id}`);
  }
}
