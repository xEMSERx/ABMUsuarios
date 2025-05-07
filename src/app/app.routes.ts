import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' }, // Redirige a /users por defecto
  { path: 'users', component: UsersComponent }, // Ruta para el componente de usuarios
];