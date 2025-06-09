import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-serv';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.loading = true;

    this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Inscription réussie ! Vous pouvez vous connecter.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Register error:', err);
        alert('Erreur lors de l’inscription');
        this.loading = false;
      }
    });
  }
}
