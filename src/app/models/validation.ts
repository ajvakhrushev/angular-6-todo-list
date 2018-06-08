import { AbstractControl } from '@angular/forms';

const URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export type ValidatorResponse = { [key: string]: boolean } | null;

export function urlValidator(control: AbstractControl): ValidatorResponse {
  if (!control.value) {
    return null;
  }

  return URL.test(control.value) ? null : {url: true};
}