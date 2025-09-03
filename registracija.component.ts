import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // DODAJ OVO!
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/models';

@Component({
  standalone: true,
  selector: 'app-registracija',
  imports: [CommonModule, FormsModule], // DODAJ FormsModule!
  template: `
    <div class="card">
      <h2>Registracija</h2>
      <form (ngSubmit)="register()">
        <label>Ime: <input [(ngModel)]="profile.firstName" name="firstName" required class="input"></label>
        <label>Prezime: <input [(ngModel)]="profile.lastName" name="lastName" required class="input"></label>
        <label>Email: <input type="email" [(ngModel)]="profile.email" name="email" required class="input"></label>
        <label>Šifra: <input type="password" [(ngModel)]="password" name="password" required class="input"></label>
        <button type="submit" class="btn">Registruj se</button>
      </form>
      <p *ngIf="error" style="color:red;">{{ error }}</p>
      <a routerLink="/prijava">Već imate nalog? Prijavite se</a>
    </div>
  `
})
export class RegistracijaComponent {
  profile: Profile = { firstName: '', lastName: '', email: '' };
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const result = this.auth.register(this.profile, this.password);
    if (result === true) {
      this.router.navigate(['/']);
    } else {
      this.error = result as string;
    }
  }
}