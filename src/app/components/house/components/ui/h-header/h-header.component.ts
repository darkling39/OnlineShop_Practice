import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { IProducts } from 'src/app/components/models/products';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-h-header',
  templateUrl: './h-header.component.html',
  styleUrls: ['./h-header.component.css'],
})
export class HHeaderComponent {
  term = '';
  products$: Observable<IProducts[]>;
  constructor(
    public authService: AuthService,
    private productService: ProductService,
    public router: Router,
    private storage: StorageService
  ) {}

  resetState() {
    this.storage.selectedCategory = '';
  }

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }
}
