import { Book } from 'src/app/models/Book';

export interface DetailStrategy {
  key: string;
  submitTitle: string;
  init(id: string): undefined;
  submit(data: Book): undefined;
  cancel?(): undefined;
}
