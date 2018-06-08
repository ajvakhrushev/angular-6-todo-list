import { TranslationService } from 'src/app/services';
import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new TranslatePipe(new TranslationService());
    expect(pipe).toBeTruthy();
  });
});
