import { Inject, PLATFORM_ID } from '@angular/core';
import { TranslationService } from 'src/app/services';
import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new TranslatePipe(new TranslationService(PLATFORM_ID));
    expect(pipe).toBeTruthy();
  });
});
