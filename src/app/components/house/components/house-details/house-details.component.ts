import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { IProducts } from 'src/app/components/models/products';
import { ProductService } from 'src/app/services/product.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css'],
})
export class HouseDetailsComponent {
  product: IProducts;
  productSubscription: Subscription;
  cart$: Observable<IProducts[]> = this.productsService.getProductFromCart();

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService,
    public dialog: MatDialog,
    public cartService: CartService
  ) {}

  // addToCart(product: IProducts) {
  //   let findItem;
  //   this.cart$
  //     .pipe(
  //       map((data) => {
  //         if (data.length > 0) {
  //           findItem = data.find((fItem) => fItem.id === product.id);
  //           if (findItem) this.productsService.updateToCart(findItem);
  //           else this.productsService.postToCart(product);
  //         } else this.productsService.postToCart(product);
  //       })
  //     )
  //     .subscribe((data) => {});
  // }

  // postToCart(product: IProducts) {
  //   product.quantity = 1;
  //   this.productsService
  //     .postProductToCart(product)
  //     .subscribe((data) => this.cart.push(data));
  // }

  // updateToCart(product: IProducts) {
  //   product.quantity += 1;
  //   this.productsService.updateProductToCart(product).subscribe((data) => {});
  // }
  ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data'];
      console.log(this.product);
    });
  }
  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  buyNow() {
    this.product.quantity = 1;
    this.cartService.deleteCart(this.cart$);

    this.productsService.postProductToCart(this.product).subscribe();
    this.openDialog();
  }
}
