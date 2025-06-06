import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
// import { CategoryComponent } from './pages/category/category.component';
// import { TaskComponent } from './pages/task/task.component';
// import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
//   { path: 'categories', component: CategoryComponent, canActivate: [authGuard] },
//   { path: 'tasks', component: TaskComponent, canActivate: [authGuard] }
];
