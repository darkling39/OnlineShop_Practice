import { Injectable } from '@angular/core';
import { IProducts } from '../components/models/products';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  selectedCategory: string = '';
  selectedItem: IProducts;
}
