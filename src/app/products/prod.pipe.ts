import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prod'
})
export class ProdPipe implements PipeTransform {

  transform(des:string): string {
    return des.substring(0,50);
  }

}
