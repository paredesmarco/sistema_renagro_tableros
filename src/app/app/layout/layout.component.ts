import { Component, effect, inject, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MenuItem } from '../../shared/models/menu-item';
import { AuthService } from '../../business/auth/auth.services';
import { UserService } from '../../shared/services/user.service';
import { Observable, of } from 'rxjs';
import { SignalService } from '../../shared/services/signal.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    HeaderComponent,
    SidebarComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  status = false;
  token = '';

  title = 'GL-Agro Dashboard';
  menuItems: MenuItem[] = [];
  userName: string = '';
  userRole: string = '';

  isMobile = false;
  private menus: MenuItem[] = [
    {
      id: 1,
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      roles: ['admin', 'user', 'manager', 'Administrador Funcional']
    },
    {
      id: 2,
      label: 'Usuarios',
      icon: 'people',
      roles: ['admin', 'Productor'],
      children: [
        { id: 21, label: 'Gestionar Usuarios', icon: 'person_add', route: '/usuarios', roles: ['admin', 'Productor'] },
        { id: 22, label: 'Roles y Permisos', icon: 'security', route: '/users/roles', roles: ['admin'] }
      ]
    },
    {
      id: 3,
      label: 'Reportes',
      icon: 'bar_chart',
      roles: ['admin', 'manager'],
      children: [
        { id: 31, label: 'Reporte Diario', icon: 'today', route: '/reports/daily', roles: ['admin', 'manager'] },
        { id: 32, label: 'Reporte Mensual', icon: 'date_range', route: '/reports/monthly', roles: ['admin', 'manager'] }
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private signalService: SignalService
  ) {
    effect(() => {
      this.status = this.signalService.getLoggedIn();
    });
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }
  ngOnInit(): void {
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this));
    this.token = localStorage.getItem('token') || '';
    if (!this.token) {
      console.log('entro al thistoken');
      this.status = false;
      this.signalService.setLoggedIn(false);
      this.router.navigateByUrl('/login');
      return;
    }
    this.signalService.setLoggedIn(true);
    const tokenData = JSON.parse(atob(this.token.split('.')[1]));
    this.loadUserData(tokenData.username);
    this.loadRolData(this.token);
  }

  loadUserData(username: string) {
    this.userService.getUserByCedula(username, this.token).subscribe({
      next: (data) => {
        this.userName = data.nombre;
        //console.log('Usuario cargado correctamente', data);
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
        this.signalService.setLoggedIn(false);
        this.router.navigateByUrl('/login');
      },
      complete: () => {
        console.log('Petición de usuario completada');
      }
    });
  }

  loadRolData(token: string) {
    this.userService.perfilFindByToken(token).subscribe({
      next: (data) => {
        const roles = data.map((perfil: any) => perfil.pfl_nombre);
        this.userRole = data[0].pfl_nombre;
        this.loadMenuByRoles(this.userRole);
      },
      error: (err) => {
        console.error('Error al obtener perfiles:', err);
        this.signalService.setLoggedIn(false);
        this.router.navigateByUrl('/login');
      },
      complete: () => {
        console.log('✔️ Petición de perfiles completada');
      }
    });
  }


  loadMenuByRoles(rol: string) {
    this.getMenuByRoles(rol).subscribe(menu => {
      this.menuItems = menu;
    });
  }

  getMenuByRoles(rol: string): Observable<MenuItem[]> {
    const filteredMenu = this.menus.filter(item =>
      item.roles.some(r => rol.includes(r))
    ).map(item => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: item.children.filter(child =>
            child.roles.some(r => rol.includes(r))
          )
        };
      }
      return item;
    });

    return of(filteredMenu);
  }

  goPage(ruta: any) {
    this.router.navigateByUrl(ruta);
    if (this.isMobile && this.sidenav) {
      this.sidenav.close();
    }
  }

  onRoleSelected(rol: any) {
    //this.userRole = data[0].pfl_nombre;
    this.userRole = rol.pfl_nombre;
    this.loadMenuByRoles(this.userRole);
  }

}
