import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuItem } from '../../../shared/models/menu-item';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserRoleModalComponent } from '../../../shared/models/user-role-modal/user-role-modal.component';
import { CerrarSesionModalComponent } from '../../../shared/models/cerrar-sesion-modal/cerrar-sesion-modal.component';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() userName: string = '';
  @Input() userRole: string = '';
  @Input() menuItems: MenuItem[] = [];
  @Output() pageSelected = new EventEmitter<string>();
  @Output() roleSelected = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) { }


  navigate(ruta: any) {
    this.pageSelected.emit(ruta);
  }

  goPerfil() {
    const dialogRef = this.dialog.open(UserRoleModalComponent, {});

    dialogRef.afterClosed().subscribe((selectedRole: string) => {
      if (selectedRole) {
        this.roleSelected.emit(selectedRole);
      }
    });
  }

  salir() {
    this.dialog.open(CerrarSesionModalComponent, {});
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }
}
