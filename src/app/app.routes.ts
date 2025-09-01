import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rutas sin layout
  {
    path: 'login',
    loadComponent: () =>
      import('./business/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'restaurar-clave',
    loadComponent: () =>
      import('./business/restaurar-clave/restaurar-clave.component').then((m) => m.RestaurarClaveComponent),
  },
  {
    path: 'actualizar-clave',
    loadComponent: () =>
      import('./business/actualizar-clave/actualizar-clave.component').then((m) => m.ActualizarClaveComponent),
  },

  // Rutas con layout
  {
    path: '',
    loadComponent: () =>
      import('./app/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./business/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'map',
        loadComponent: () =>
          import('./business/dashboard-z1/pages/map-page/map-page.component').then((m) => m.MapPageComponent),
      },
      {
        path: 'data',
        loadComponent: () =>
          import('./business/dashboard-z1/pages/data-page/data-page.component').then((m) => m.DataPageComponent),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./business/usuarios/usuarios.component').then((m) => m.UsuariosComponent),
      },
    ],
  },
];
