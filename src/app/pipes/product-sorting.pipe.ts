import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../components/models/products';

@Pipe({
  name: 'productSorting',
})
export class ProductSortingPipe implements PipeTransform {
  transform(products: IProducts[]): IProducts[] {
    return products.sort((a, b) => b.purchaces - a.purchaces).slice(0, 5);
  }
}
