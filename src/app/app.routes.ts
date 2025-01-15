import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { repairNavGuard } from './guards/repair-nav.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // Root route with authGuard
  },
  {
    path: 'admin-home',
    loadComponent: () =>
      import('./pages/admin/admin-home/admin-home.component').then(
        (m) => m.AdminHomeComponent
      ),
  },
  {
    path: 'user-home',
    loadComponent: () =>
      import('./pages/user-home/user-home.component').then(
        (m) => m.UserHomeComponent
      ),
  },
  {
    path: 'repairs',
    loadComponent: () =>
      import('./pages/admin/repairs/repairs.component').then(
        (m) => m.RepairsComponent
      ),
  },
  {
    path: 'create-repair',
    loadComponent: () =>
      import('./pages/admin/create-repair/create-repair.component').then(
        (m) => m.CreateRepairComponent
      ),
  },
  {
    path: 'search-repair',
    loadComponent: () =>
      import('./pages/admin/search-repair/search-repair.component').then(
        (m) => m.SearchRepairComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'create-owner',
    loadComponent: () =>
      import('./pages/admin/create-owner/create-owner.component').then(
        (m) => m.CreateOwnerComponent
      ),
  },
  {
    path: 'property-owner-search',
    loadComponent: () =>
      import(
        './pages/admin/property-owner-search/property-owner-search.component'
      ).then((m) => m.PropertyOwnerSearchComponent),
  },
  {
    path: 'properties-and-property-owners',
    loadComponent: () =>
      import(
        './pages/admin/properties-and-property-owners/properties-and-property-owners.component'
      ).then((m) => m.PropertiesAndPropertyOwnersComponent),
  },
  {
    path: 'properties-and-property-owners/property-owner/:id',
    loadComponent: () =>
      import(
        './pages/admin/property-owner-details/property-owner-details.component'
      ).then((m) => m.PropertyOwnerDetailsComponent),
  },
];
