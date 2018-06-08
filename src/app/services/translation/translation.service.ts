import { Injectable, ApplicationRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs';

import { Storage, TranslationHash, TranslationHashList } from 'src/app/models';

const DEFAULT_LANG = 'en';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private lang: string = DEFAULT_LANG;
  private translations: TranslationHashList;
  private translation: TranslationHash;

  constructor() {
    combineLatest(Storage.getItem('lang'), this.getTranslations()).subscribe(([value, data]) => {
      const lang = value || DEFAULT_LANG;

      this.lang = lang;
      this.translations = data || {};
      this.translation = this.translations[this.lang] || null;

      if (!value) {
        Storage.setItem('lang', DEFAULT_LANG).subscribe();
      }
    });
  }

  setLanguage(value: string) {
    Storage.setItem('lang', value || DEFAULT_LANG).subscribe((value: string) => {
      window.location.reload();
    });
  }

  getLanguage(): string {
    return this.lang;
  }

  getTranslations(): Observable<TranslationHashList> {
    return Storage.getItem('translations');
  }

  get(value: string): string {
    return this.translation && value ? this.translation[value] : null;
  }

}
