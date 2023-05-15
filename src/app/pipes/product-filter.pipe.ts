import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../components/models/products';

@Pipe({
  name: 'productFilter',
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: IProducts[], search: string): IProducts[] {
    return products.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }
}
