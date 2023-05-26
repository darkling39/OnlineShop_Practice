import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IProducts } from 'src/app/components/models/products';
import { ProductService } from 'src/app/services/product.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(
    public ProductsService: ProductService,
    private breadService: BreadcrumbService,
    public dialog: MatDialog
  ) {}

  cart: IProducts[];
  cartSubscription: Subscription;
  totalPrice: number = 0;
  cart$: Observable<IProducts[]> = this.ProductsService.getProductFromCart();

  ngOnInit(): void {
    this.cartSubscription = this.ProductsService.getProductFromCart().subscribe(
      (data) => {
        this.cart = data;
      }
    );
    this.breadService.set('@Cart', 'Cart');
  }

  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  minusItemFromCart(item: IProducts) {
    if (item.quantity === 1) {
      this.ProductsService.deleteProductFromCart(item.id).subscribe(() => {
        let idx = this.cart.findIndex((data) => data.id === item.id);
        this.cart.splice(idx, 1);
      });
    } else {
      item.quantity -= 1;
      this.ProductsService.updateProductToCart(item).subscribe((data) => {});
    }
  }
  plusItemFromCart(item: IProducts) {
    item.quantity += 1;
    this.ProductsService.updateProductToCart(item).subscribe((data) => {});
  }

  ngOnDestroy() {
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
  }
}
