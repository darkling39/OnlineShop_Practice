import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { IProducts } from '../components/models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsResolver implements Resolve<IProducts[]> {
  constructor(private productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProducts[]> {
    return this.productService.getAllProducts();
  }
}
