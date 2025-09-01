import { Component , OnInit} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { RestaurarClaveService } from '../../shared/services/restaurar-clave.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';

@Component({
  selector: 'app-restaurar-clave',
  imports: [
    
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './restaurar-clave.component.html',
  styleUrl: './restaurar-clave.component.css'
})
export class RestaurarClaveComponent {
  restorePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private restaurarclave:RestaurarClaveService,
    private showSnackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.restorePasswordForm = this.fb.group({
      usr_usuario: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.restorePasswordForm.valid) {
      const usuario = this.restorePasswordForm.value.usr_usuario;      
      const token=localStorage.getItem('token')!;
      this.restaurarclave.getRecoveryPass(usuario,token).subscribe({next: (resp:any) => {
        this.showSnackBar.showsucces(resp.message);
      },
      error: (error:any) => {
        this.showSnackBar.showSnackBar(error.error.message);
      }
      }
        
      );      
      
    }
  }
  goLogin()
  {
    this.router.navigateByUrl('/login');
  }

  goActualizar()
  {
    this.router.navigateByUrl('/actualizar-clave');
  }

}
