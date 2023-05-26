import { Component } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { IProducts } from 'src/app/components/models/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-house-products',
  templateUrl: './house-products.component.html',
  styleUrls: ['./house-products.component.css'],
})
export class HouseProductsComponent {
  constructor(
    private productsService: ProductService,
    private breadService: BreadcrumbService,
    private storage: StorageService,
    public cartService: CartService
  ) {}

  canEdit = false;
  cart$: Observable<IProducts[]> = this.productsService.getProductFromCart();
  // cartSubcription: Subscription;

  products$: Observable<IProducts[]> = this.productsService
    .getAllProducts()
    .pipe(
      map((data) => {
        if (this.storage.selectedCategory !== '') {
          return data.filter(
            (e) => e.category === this.storage.selectedCategory
          );
        } else return data;
      })
    );

  // addToCart(product: IProducts) {
  //   // product.rating.count = 1;
  //   let findItem;
  //   if (this.cart.length > 0) {
  //     findItem = this.cart.find((item) => item.id === product.id);
  //     if (findItem) this.updateToCart(findItem);
  //     else this.postToCart(product);
  //   } else this.postToCart(product);
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

  ngOnInit() {
    // this.cartSubcription = this.productsService
    //   .getProductFromCart()
    //   .subscribe((data) => (this.cart = data));
    this.breadService.set('@Products', 'Products');
  }
}
