import { Component,OnInit  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActualizarClaveService } from '../../shared/services/actualizar-clave.service';
import { md5 } from 'js-md5';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-clave',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './actualizar-clave.component.html',
  styleUrl: './actualizar-clave.component.css'
})
export class ActualizarClaveComponent implements OnInit {
  updatePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private actualizarClave: ActualizarClaveService,
    private showSnackBar: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updatePasswordForm = this.fb.group({
      usr_usuario: ['', Validators.required],
      usr_pass: ['', Validators.required],
      usr_pass_temp: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.updatePasswordForm.valid) {
      const formValue = this.updatePasswordForm.value;
      //
      
      this.updatePasswordForm.value.usr_pass = md5(this.updatePasswordForm.value.usr_pass);
      this.updatePasswordForm.value.usr_pass_temp = md5(this.updatePasswordForm.value.usr_pass_temp);
      
      this.actualizarClave.getUpdatePass(formValue.usr_usuario, formValue.usr_pass,formValue.usr_pass_temp).subscribe({next: (resp:any) => {
      
        this.showSnackBar.showsucces("Contraseña cambiada exitosamente!!");
        this.router.navigateByUrl('login');
      },
      error: (error:any) => {
        this.showSnackBar.showSnackBar(error.error.message.conflict);
      }
      }
      );
      //getUpdatePass
    } else {
      console.log('error form');
      this.showSnackBar.showSnackBar("Debe completar el formulario");
    }
  }
}
