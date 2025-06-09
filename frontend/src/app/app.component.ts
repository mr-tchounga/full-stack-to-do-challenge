import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, BreadcrumbComponent],
  template: `
    <app-breadcrumb></app-breadcrumb>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
