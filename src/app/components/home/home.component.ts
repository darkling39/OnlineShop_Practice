import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProducts } from '../models/products';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private productService: ProductService) {}
  products$: Observable<IProducts[]>;
  products: IProducts[];
  productSubscription: Subscription;
  details = false;
  href: string = '';

  ngOnInit(): void {
    this.products$ = this.productService.getRecentlyProducts();
    this.productSubscription = this.productService
      .getAllProducts()
      .subscribe((data) => {
        this.products = data;
      });
  }
  getPreviousCategory(i: number) {
    if (i - 1 < 0) return;
    return this.products[i - 1].category;
  }
  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
