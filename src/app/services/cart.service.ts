import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { IProducts } from '../components/models/products';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private productService: ProductService) {}

  addToCart(product: IProducts, cart$: Observable<IProducts[]>) {
    let findItem;
    cart$
      .pipe(
        map((data) => {
          if (data.length > 0) {
            findItem = data.find((fItem) => fItem.id === product.id);
            if (findItem) this.updateToCart(findItem);
            else this.postToCart(product);
          } else this.postToCart(product);
        })
      )
      .subscribe((data) => {});
  }

  postToCart(product: IProducts) {
    product.quantity = 1;
    this.productService.postProductToCart(product).subscribe((data) => {});
  }
  updateToCart(product: IProducts) {
    product.quantity += 1;
    this.productService.updateProductToCart(product).subscribe((data) => {});
  }
  deleteCart(cart: Observable<IProducts[]>) {
    cart.subscribe((data) => {
      data.map((item) => {
        this.productService.deleteProductFromCart(item.id).subscribe();
      });
    });
  }
}
