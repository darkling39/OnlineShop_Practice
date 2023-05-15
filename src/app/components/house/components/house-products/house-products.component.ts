import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProducts } from 'src/app/components/models/products';
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
    private storage: StorageService
  ) {}
  canEdit = false;
  products$: Observable<IProducts[]> = this.productsService
    .getAllProducts()
    .pipe(
      map((data) => {
        console.log(this.storage.selectedCategory);

        if (this.storage.selectedCategory !== '') {
          return data.filter(
            (e) => e.category === this.storage.selectedCategory
          );
        } else return data;
      })
    );

  ngOnInit() {
    // this.products$ = this.productsService.getAllProducts().pipe();
    this.breadService.set('@Products', 'Products');
  }
}
