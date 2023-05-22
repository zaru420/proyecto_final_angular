// filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, keys: string[]): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      for (const key of keys) {
        if (item[key].toString().toLowerCase().includes(searchTerm)) {
          return true;
        }
      }
      return false;
    });
  }
}
