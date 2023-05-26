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
  urlBestSellers: string = 'http://localhost:4000/bestSellers';

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

  postToBestSellers(product: IProducts) {
    return this.http.post<IProducts>(this.urlBestSellers, product);
  }
  getBestSellers() {
    return this.http.get<IProducts[]>(this.urlBestSellers);
  }

  // addToCart(product: IProducts, cart$: Observable<IProducts[]>) {
  //   let findItem;
  //   cart$
  //     .pipe(
  //       map((data) => {
  //         if (data.length > 0) {
  //           findItem = data.find((fItem) => fItem.id === product.id);
  //           if (findItem) this.updateToCart(findItem);
  //           else this.postToCart(product);
  //         } else this.postToCart(product);
  //       })
  //     )
  //     .subscribe((data) => {});
  // }

  // postToCart(product: IProducts) {
  //   product.quantity = 1;
  //   this.postProductToCart(product).subscribe((data) => {});
  // }
  // updateToCart(product: IProducts) {
  //   product.quantity += 1;
  //   this.updateProductToCart(product).subscribe((data) => {});
  // }

  // deleteCart(cart: Observable<IProducts[]>) {
  //   cart.subscribe((data) => {
  //     data.map((item) => {
  //       this.deleteProductFromCart(item.id).subscribe();
  //     });
  //   });
  // }
  // deleteRest(recent: Observable<IProducts[]>) {
  //   recent.subscribe((recData) => {
  //     recData
  //       .reverse()
  //       .slice(5, recData.length)
  //       .map((item) => {
  //         this.deleteProductFromRecent(item.id).subscribe((data) => {});
  //       });
  //   });
  // }
  // addToRecent(cart: Observable<IProducts[]>, recent: Observable<IProducts[]>) {
  //   let recId: Array<number> = [];
  //   recent.subscribe((recData) => {
  //     recData.map((recItem) => {
  //       recId.push(recItem.id);
  //     });
  //   });

  //   cart.subscribe((cartData) => {
  //     cartData.map((cartItem) => {
  //       if (!recId.includes(cartItem.id)) {
  //         this.postProductToRecently(cartItem).subscribe((data) => {});
  //       } else {
  //         console.log('same');
  //         this.deleteProductFromRecent(cartItem.id).subscribe((data) => {});
  //         this.postProductToRecently(cartItem).subscribe((data) => {});
  //       }
  //     });
  //   });
  // }

  // openDialog(): void {
  //   let dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //   });
  // }
}
