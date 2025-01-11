import { Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { authGuard } from './services/auth/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { RepairsComponent } from './pages/repairs/repairs.component';

export const routes: Routes = [
  {path:'',  component: LoginComponent, canActivate: [authGuard]},
    { path: 'admin-home', component: AdminHomeComponent}, 
    { path: 'user-home', component: UserHomeComponent },
    { path: 'repairs', component: RepairsComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent}
    
];
