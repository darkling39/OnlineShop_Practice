import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { IProducts } from '../components/models/products';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<IProducts> {
  constructor(private productService: ProductService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProducts> {
    return this.productService.getSingleProduct(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['house/products']);
        return EMPTY;
      })
    );
  }
}
