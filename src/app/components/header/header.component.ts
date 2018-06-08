import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { TranslationHashList } from 'src/app/models';

import { TranslationService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  languages: string[] = [];
  lang: string;

  constructor(
    private translationService: TranslationService
  ) {
    this.lang = this.translationService.getLanguage();

    this.translationService.getTranslations().subscribe((data: TranslationHashList) => {
      this.languages = Object.keys(data);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}

  onLanguageChanged(event: MatSelectChange) {
    this.translationService.setLanguage(event.value);
  }

}
