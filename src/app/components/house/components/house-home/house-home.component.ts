import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IProducts } from 'src/app/components/models/products';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-house-home',
  templateUrl: './house-home.component.html',
  styleUrls: ['./house-home.component.css'],
})
export class HouseHomeComponent {
  constructor(
    private productService: ProductService,
    private breadService: BreadcrumbService,
    private router: Router,
    private storage: StorageService
  ) {}
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
    this.breadService.set('house', 'Home');
  }

  directTo(elem: string) {
    this.router.navigateByUrl('house/h-products');
    this.storage.selectedCategory = elem;
  }
  getPreviousCategory(i: number) {
    if (i - 1 < 0) return;
    return this.products[i - 1].category;
  }
  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
