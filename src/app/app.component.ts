import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SignalService } from './shared/services/signal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'template-mag';
  
  private router = inject(Router);
  private signal = inject(SignalService);
  status: boolean = false;
  token: string = '';

  
  constructor() {
    effect(async () => {
      this.status = this.signal.getLoggedIn(); //SIGNAL
      this.token = (await localStorage.getItem('token')) || '';      
      if (this.token === '') {
        this.status = false;
      } else {
        this.status = true;
      }
    });
    this.openApp();
  }
  async openApp() {
    this.token = (await localStorage.getItem('token')) || '';
    if (this.token === '') {
      this.status = false;
      this.router.navigateByUrl('/login');
    } else {      
      this.status = true;
      this.router.navigateByUrl('/home');

    }
  }
  go(url: string) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.status = false;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
