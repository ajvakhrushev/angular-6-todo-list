import { Book } from 'src/app/models/Book';

export interface DetailStrategy {
  key: string;
  init(id: string): undefined;
  submit(data: Book): undefined;
  cancel?(): undefined;
}
