import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private isLoggedInSignal = signal<boolean>(false);

  constructor() {}

  setLoggedIn(value: boolean) {
    this.isLoggedInSignal.set(value);
  }

  getLoggedIn() {
    return this.isLoggedInSignal();
  }
}
