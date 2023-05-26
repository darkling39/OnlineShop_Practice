import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/components/models/products';
import { ProductService } from 'src/app/services/product.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css'],
})
export class HouseDetailsComponent {
  product: IProducts;
  productSubscription: Subscription;
  cart: IProducts[];
  cartSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService,
    public dialog: MatDialog
  ) {}
  addToCart(product: IProducts) {
    // product.rating.count = 1;
    let findItem;
    if (this.cart.length > 0) {
      findItem = this.cart.find((item) => item.id === product.id);
      if (findItem) this.updateToCart(findItem);
      else this.postToCart(product);
    } else this.postToCart(product);
  }

  postToCart(product: IProducts) {
    product.quantity = 1;
    this.productsService
      .postProductToCart(product)
      .subscribe((data) => this.cart.push(data));
  }

  updateToCart(product: IProducts) {
    product.quantity += 1;
    this.productsService.updateProductToCart(product).subscribe((data) => {});
  }
  ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data'];
      console.log(this.product);
    });

    this.cartSubscription = this.productsService
      .getProductFromCart()
      .subscribe((data) => {
        this.cart = data;
      });
  }

  // buyNow(product: IProducts): void {
  //   let dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;

  //   const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //   });
  // }
}
