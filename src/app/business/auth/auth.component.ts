import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';


import { md5 } from 'js-md5';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { SignalService } from '../../shared/services/signal.service';
import { AuthService } from './auth.services';

import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  loginForm!: FormGroup;
  hidePassword = true;

  form!: FormGroup;
  title =
    'Sistema para la administración de la Arquitectura tecnógica del Ministerio de Agricultura';
  //private router = inject(Router);
  private readonly _fb = inject(FormBuilder);
  //  private authService = inject(AuthService);
  private destroy$ = new Subject<void>(); // Subject to signal component destruction
  private showSnackBar = inject(SnackBarService);//revisar las importaciones
  private signal = inject(SignalService);

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    //this._buildForm();

  }

  initLogin() {
    this.router.navigateByUrl('/home');
  }

  /*private _buildForm(): void {
    this.form = this._fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required],
    });
  }*/

  onSubmit() {


    this.loginForm.value.password = md5(this.loginForm.value.password);
    const data = this.loginForm.value;

    this.authService
      .getToken(data)
      .pipe(takeUntil(this.destroy$)) // Unsubscribe on component destruction
      .subscribe({
        next: (resp: any) => {
          // Handle successful token retrieval (e.g., store token, navigate)
          localStorage.setItem('token', resp.accessToken);
          this.signal.setLoggedIn(true);
          this.loginForm.reset();
          this.initLogin();
        },
        error: (error: any) => {
          console.error('Error fetching token:', error.error);
          localStorage.removeItem('token');
          this.signal.setLoggedIn(false);
          this.showSnackBar.showSnackBar(error.error.message);
        },
      });
  }

  goRestaurar() {
    this.router.navigateByUrl('restaurar-clave');
  }

}
