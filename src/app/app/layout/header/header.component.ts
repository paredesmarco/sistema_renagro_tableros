import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRoleModalComponent } from '../../../shared/models/user-role-modal/user-role-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  @Input() userName: string = '';
  @Input() title: string = '';
  @Output() roleSelected = new EventEmitter<string>();

  constructor(private router: Router, private dialog: MatDialog,
  ) { }

  salir() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  goPerfil() {
    const dialogRef = this.dialog.open(UserRoleModalComponent, {});

    dialogRef.afterClosed().subscribe((selectedRole: string) => {
      if (selectedRole) {
        this.roleSelected.emit(selectedRole);
      }
    });
  }
}
