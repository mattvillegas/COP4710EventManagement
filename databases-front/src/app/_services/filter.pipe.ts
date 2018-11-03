import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(eventlist: any, inputString: string): any {
    // Check if the search inputString is empty/undefined
    if(inputString === undefined){
      return eventlist;
    }
    // If there is input string to search:
    return eventlist.filter(function(retVal){
      return retVal.name.toLowerCase().includes(inputString.toLowerCase());
    });
  }

}