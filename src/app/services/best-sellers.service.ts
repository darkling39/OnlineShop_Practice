import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Observable, delay, map } from 'rxjs';
import { IProducts } from '../components/models/products';

@Injectable({
  providedIn: 'root',
})
export class BestSellersService {
  constructor(private productService: ProductService) {}

  addTobestSellers(
    cart: Observable<IProducts[]>,
    bestSellers: Observable<IProducts[]>
  ) {
    let bestId: Array<number> = [];
    let findBastard;
    bestSellers.subscribe((bestData) => {
      bestData.map((bestItem) => {
        bestId.push(bestItem.id);
      });
    });

    cart.subscribe((cartData) => {
      cartData.map((cartItem) => {
        if (bestId.length > 0) {
          if (!bestId.includes(cartItem.id)) {
            this.postToBestSellers(cartItem);
          } else {
            bestSellers
              .pipe(
                map((bData) => {
                  findBastard = bData.find((fItem) => fItem.id === cartItem.id);
                  if (findBastard) this.updateToBestSellers(findBastard);
                  else this.postToBestSellers(cartItem);
                })
              )
              .subscribe((data) => {});
          }
        } else this.postToBestSellers(cartItem);
      });
    });
  }

  postToBestSellers(product: IProducts) {
    product.purchaces = 1;
    this.productService
      .postProductToBestSellers(product)
      .subscribe((data) => {});
  }
  updateToBestSellers(product: IProducts) {
    product.purchaces += 1;
    this.productService
      .updateProductToBestSellers(product)
      .subscribe((data) => {});
  }
}
