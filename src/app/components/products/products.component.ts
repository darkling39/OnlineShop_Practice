import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProducts } from '../models/products';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(private productService: ProductService) {}

  // products: IProducts[];
  products$: Observable<IProducts[]>;
  productSubscription: Subscription;
  details = false;

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
    // this.productSubscription = this.productService
    //   .getAllProducts()
    //   .subscribe((data) => {
    //     this.products = data;
    //   });
  }
  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
