import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // OVO JE ISPRAVNO!

@Component({
  standalone: true,
  selector: 'app-prijava',
  imports: [CommonModule, FormsModule],
  providers: [AuthService],
  template: `
    <div class="card">
      <h2>Prijava</h2>
      <form (ngSubmit)="login()">
        <label>Email: <input type="email" [(ngModel)]="email" name="email" required class="input"></label>
        <label>Šifra: <input type="password" [(ngModel)]="password" name="password" required class="input"></label>
        <button type="submit" class="btn">Prijavi se</button>
      </form>
      <p *ngIf="error" style="color:red;">{{ error }}</p>
      <a routerLink="/registracija">Nemate nalog? Registrujte se</a>
    </div>
  `
})
export class PrijavaComponent {
  email = '';
  password = '';
  error = '';

  constructor(public auth: AuthService, private router: Router) {}

  login() {
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/']);
    } else {
      this.error = 'Pogrešan email ili šifra!';
    }
  }
}