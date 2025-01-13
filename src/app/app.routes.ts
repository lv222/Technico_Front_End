import { Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { authGuard } from './guards/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { RepairsComponent } from './pages/admin/repairs/repairs.component';
import { repairNavGuard } from './guards/repair-nav.guard';
import { CreateRepairComponent } from './pages/admin/create-repair/create-repair.component';
import { PropertyOwnerDetailsComponent } from './pages/admin/property-owner-details/property-owner-details.component';
import { PropertiesAndPropertyOwnersComponent } from './pages/admin/properties-and-property-owners/properties-and-property-owners.component';
import { PropertyOwnerSearchComponent } from './pages/admin/property-owner-search/property-owner-search.component';

export const routes: Routes = [
  {path:'',  component: LoginComponent, canActivate: [authGuard]},
    { path: 'admin-home', component: AdminHomeComponent}, 
    { path: 'user-home', component: UserHomeComponent },
    { path: 'repairs', component: RepairsComponent, canActivate: [repairNavGuard]},
    { path: 'create-repair', component: CreateRepairComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'property-owner-search', component: PropertyOwnerSearchComponent },
    { path: 'properties-and-property-owners', component: PropertiesAndPropertyOwnersComponent},
	{
		path: 'properties-and-property-owners/property-owner/:id',
		component: PropertyOwnerDetailsComponent
	},
    
];
