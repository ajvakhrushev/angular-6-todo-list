import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

class OfflineStorage {

  private items: any = {};

  setItem(key: string, value: any) {
    this.items[key] = value;

    return this.items[key] || null;
  }

  getItem(key: string) {
    return key ? (this.items[key] || null) : null;
  }

  clear() {
    this.items = <any>{};
  }

}

class LocalStorage {

  private getValue(key: string) {
    const value = window.localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  }

  setItem(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));

    return this.getValue(key) || null;
  }

  getItem(key: string) {
    return key ? (this.getValue(key) || null) : null;
  }

  clear() {
    window.localStorage.clear();
  }

}

let storage: OfflineStorage | LocalStorage;

export namespace Storage {

  export function setStorage(key?: string) {
    if (!key) {
      storage = new LocalStorage();
    }

    switch(key) {
      case 'offline': storage = new OfflineStorage(); break;
      default: storage = new LocalStorage();
    }
  }

  export function setItem(key: string, value: any): Observable<any> {
    storage.setItem(key, value);

    return Observable.of(storage.getItem(key));
  }

  export function getItem(key: string): Observable<any> {
    return Observable.of(storage.getItem(key));
  }

  export function clear(): Observable<any> {
    storage.clear();

    return Observable.of(true);
  }

}
