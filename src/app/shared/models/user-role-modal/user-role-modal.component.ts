import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface Role {
  pfl_id: number;
  upf_id: number
  pfl_nombre: string;
  pfl_descripcion?: string;
}

@Component({
  selector: 'app-user-role-modal',
  imports: [MatDialogModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './user-role-modal.component.html',
  styleUrl: './user-role-modal.component.css'
})
export class UserRoleModalComponent implements OnInit {
  roles: Role[] = [];
  selectedRole: Role | null = null;
  selectedValue!: string;


  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<UserRoleModalComponent>,
    private router: Router,
  ) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.userService.perfilFindByToken(token!).subscribe(data => {
      this.roles = data;
    });
  }

  selectRole(role: Role): void {
    this.selectedRole = role;
  }


  onConfirm(): void {
    this.userService.setRole(String(this.selectedRole?.pfl_nombre));
    this.dialogRef.close(this.selectedRole);
    this.router.navigateByUrl('/home');
  }
}