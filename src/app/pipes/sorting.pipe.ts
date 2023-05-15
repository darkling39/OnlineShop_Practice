import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../components/models/products';

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(products: IProducts[], search: string): IProducts[] {
    return products.filter((item) =>
      item.category.toLowerCase().includes(search.toLowerCase())
    );
  }
}
