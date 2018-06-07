import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'src/app/services';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private translationService: TranslationService
  ) { }

  transform(value: string, args?: any): string {
    return value ? this.translationService.get(value) : null;
  }

}
