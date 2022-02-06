import { Pipe, PipeTransform } from '@angular/core';  

export class Birds {  
  id: number;  
  name: string;  
}
@Pipe({  
    name: 'filter', 
    pure: false  
})  
  
export class MyFilterPipe implements PipeTransform {  
    transform(items: any[], searchText: string): any[] {
        if(!items) return [];
        if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
          return it.toLowerCase().includes(searchText);
        });
       }
}  