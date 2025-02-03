import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { UserProfile } from './user-profile';

@Injectable()
export class FormDataService {
  activeTabIndex = signal(0);
  activeTabIndex$ = toObservable(this.activeTabIndex);
  isFormValueValid = signal(true);
  formData = signal<UserProfile>({
    name: 'Jidnyasa',
    age: 20,
    email: 'jgondane@gmail.com',
    intresets: ['coding'],
    settings: {
      theme: 'dark',
    },
  });
  formData$ = toObservable(this.formData);
  constructor() {}
}
