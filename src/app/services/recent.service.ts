import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../components/models/products';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class RecentService {
  constructor(private productService: ProductService) {}

  deleteRest(recent: Observable<IProducts[]>) {
    recent.subscribe((recData) => {
      recData
        .reverse()
        .slice(5, recData.length)
        .map((item) => {
          this.productService
            .deleteProductFromRecent(item.id)
            .subscribe((data) => {});
        });
    });
  }
  addToRecent(cart: Observable<IProducts[]>, recent: Observable<IProducts[]>) {
    let recId: Array<number> = [];
    recent.subscribe((recData) => {
      recData.map((recItem) => {
        recId.push(recItem.id);
      });
    });

    cart.subscribe((cartData) => {
      cartData.map((cartItem) => {
        if (!recId.includes(cartItem.id)) {
          this.productService
            .postProductToRecently(cartItem)
            .subscribe((data) => {});
        } else {
          console.log('same');
          this.productService
            .deleteProductFromRecent(cartItem.id)
            .subscribe((data) => {});
          this.productService
            .postProductToRecently(cartItem)
            .subscribe((data) => {});
        }
      });
    });
  }
}
