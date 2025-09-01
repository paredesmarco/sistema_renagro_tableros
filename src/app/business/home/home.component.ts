import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../auth/auth.services';
import { MenuItem } from '../../shared/models/menu-item';
import { Router, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-home',
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'Template';
  menuItems: MenuItem[] = [];
  userName: string = '';
  userRole: string = '';

  private menus: MenuItem[] = [
    {
      id: 1,
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      roles: ['admin', 'user', 'manager']
    },
    {
      id: 2,
      label: 'Usuarios',
      icon: 'people',
      roles: ['admin'],
      children: [
        {
          id: 21,
          label: 'Gestionar Usuarios',
          icon: 'person_add',
          route: '/users/manage',
          roles: ['admin']
        },
        {
          id: 22,
          label: 'Roles y Permisos',
          icon: 'security',
          route: '/users/roles',
          roles: ['admin']
        }
      ]
    },
    {
      id: 3,
      label: 'Reportes',
      icon: 'bar_chart',
      roles: ['admin', 'manager'],
      children: [
        {
          id: 31,
          label: 'Reporte Diario',
          icon: 'today',
          route: '/reports/daily',
          roles: ['admin', 'manager']
        },
        {
          id: 32,
          label: 'Reporte Mensual',
          icon: 'date_range',
          route: '/reports/monthly',
          roles: ['admin', 'manager']
        }
      ]
    },
    {
      id: 4,
      label: 'Perfil',
      icon: 'person',
      route: '/profile',
      roles: ['admin', 'user', 'manager']
    },
    {
      id: 5,
      label: 'Configuración',
      icon: 'settings',
      route: '/settings',
      roles: ['admin']
    }
  ];


  constructor(private auth: AuthService,
    private router: Router,
    private user: UserService,
  ) { }

  ngOnInit() {
  }



}
