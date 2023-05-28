import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { IProducts } from 'src/app/components/models/products';
import { ProductService } from 'src/app/services/product.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { CartService } from 'src/app/services/cart.service';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css'],
})
export class HouseDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService,
    public dialog: MatDialog,
    public cartService: CartService,
    private storage: StorageService
  ) {}
  product: IProducts;
  productSubscription: Subscription;
  cart$: Observable<IProducts[]> = this.productsService.getProductFromCart();
  imageObjects: Array<object>;
  sliderInfinite: boolean = true;
  products: Observable<IProducts[]> = this.productsService.getAllProducts();

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
      this.storage.selectedItem = this.product;
      console.log(this.storage.selectedItem);
      this.imageObjects = [
        {
          image: this.product.image,
          thumbImage: this.product.image,
        },
        {
          image: this.product.image,
          thumbImage: this.product.image,
        },
        {
          image: this.product.image,
          thumbImage: this.product.image,
        },
        {
          image: this.product.image,
          thumbImage: this.product.image,
        },
      ];
    });
  }
  openDialog(dialog: any): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(dialog, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  buyNow() {
    this.product.quantity = 1;
    this.cartService.deleteCart(this.cart$);

    this.productsService.postProductToCart(this.product).subscribe();
    this.openDialog(DialogBoxComponent);
  }

  createReview() {
    this.openDialog(ReviewDialogComponent);
  }
}
