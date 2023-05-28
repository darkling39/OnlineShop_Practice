import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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
            .subscribe((data) => {
              console.log('rest products deleted');
            });
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
    console.log(recId);
    cart
      .pipe(
        map((data) => {
          data.map((item) => {
            if (!recId.includes(item.id))
              this.productService.postProductToRecently(item).subscribe();
            else
              this.productService
                .deleteProductFromRecent(item.id)
                .subscribe(() => {
                  this.productService.postProductToRecently(item).subscribe();
                  console.log(item);
                });
          });
        })
      )
      .subscribe();
    // cart.subscribe((cartData) => {
    //   cartData.map((cartItem) => {
    //     if (!recId.includes(cartItem.id)) {
    //       this.productService
    //         .postProductToRecently(cartItem)
    //         .subscribe((data) => {});
    //     } else {
    //       console.log('same');
    //       this.productService
    //         .deleteProductFromRecent(cartItem.id)
    //         .subscribe((data) => {});
    //       this.productService
    //         .postProductToRecently(cartItem)
    //         .subscribe((data) => {});
    //     }
    //   });
    // });
  }
}
