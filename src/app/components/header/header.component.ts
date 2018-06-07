import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  languages: string[] = [];
  lang: string;

  constructor(
    private translationService: TranslationService
  ) {
    this.translationService.$languages.subscribe((list: string[]) => this.languages = list || []);
    this.translationService.$lang.subscribe((value: string) => {
      if (!value || this.lang === value) {
        return;
      }

      this.lang = value;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}

  onLanguageChanged() {
    this.translationService.$lang.next(this.lang);
  }

}
