import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Storage, TranslationHash, TranslationHashList } from 'src/app/models';

const DEFAULT_LANG = 'en';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private lang: string = DEFAULT_LANG;
  private translations: TranslationHashList;
  private translation: TranslationHash;

  $languages: Subject<string[]> = new Subject<string[]>();
  $lang: Subject<string> = new Subject<string>();

  constructor() {
    this.$lang.next(DEFAULT_LANG);

    this.getTranslations().subscribe((data: TranslationHashList) => {
      this.translations = data || {};
      this.translation = this.translations[this.lang] || null;
    });
  }

  setLanguage(value: string) {
    const lang = value || DEFAULT_LANG;

    this.lang = lang;
    this.translation = this.translations[this.lang] || null;
    this.$lang.next(lang);
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
