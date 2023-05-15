import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { IProducts } from '../models/products';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  term = '';
  products$: Observable<IProducts[]>;
  constructor(
    public authService: AuthService,
    private productService: ProductService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }
}
