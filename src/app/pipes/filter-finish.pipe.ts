import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filterFinish',
  pure: false
})
export class FilterFinishPipe implements PipeTransform {

  transform(listas: Lista[], finish: boolean = true): Lista[] {

    return listas.filter( lista => {
      return lista.completada === finish;
    });

  }

}
