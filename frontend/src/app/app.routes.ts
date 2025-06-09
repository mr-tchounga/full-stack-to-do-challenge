import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { CategoryComponent } from './pages/category/category';
import { TaskComponent } from './pages/task/task'; 
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'categories', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: { breadcrumb: 'Connexion' } },
    { path: 'register', component: RegisterComponent },
    { path: 'categories', component: CategoryComponent, canActivate: [authGuard] },
    
    { path: 'categories/:categoryId/tasks', 
        component: TaskComponent, 
        canActivate: [authGuard],
        data: { breadcrumb: 'Tâches' } },
    { path: 'categories/:categoryId/tasks/:taskId', 
        component: TaskComponent, 
        canActivate: [authGuard],
        data: { breadcrumb: 'Tâches' } },
];
