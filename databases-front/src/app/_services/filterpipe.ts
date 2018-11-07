import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(eventlist: any, inputString: String): any {
    // Check if the search is empty
    if(inputString === undefined){
      return eventlist;
    }
    // There is input string to search
    return eventlist.filter(function(retVal){
      return retVal.name.toLowerCase().includes(inputString.toLowerCase());
    });
  }

}