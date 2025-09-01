import { Component } from '@angular/core';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cerrar-sesion-modal',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
  ],
  templateUrl: './cerrar-sesion-modal.component.html',
  styleUrl: './cerrar-sesion-modal.component.css'
})
export class CerrarSesionModalComponent {

  constructor(private router:Router,
    private dialogRef: MatDialogRef<CerrarSesionModalComponent>,
  ){}

  logout() {
    //this.status = false;
    localStorage.clear();
    location.reload();
    this.router.navigateByUrl('/login');
  }
  cancel() {
    this.dialogRef.close();
  }
}
