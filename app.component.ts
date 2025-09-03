import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service'; // ISPRAVNA PUTANJA!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  providers: [AuthService],
  template: `
  <header class="container">
    <div class="header">
      <div class="nav">
        <a [routerLink]="['/']">🎬 Bioskop</a>
        <a [routerLink]="['/projekcije']" routerLinkActive="active">Projekcije</a>
        <a [routerLink]="['/korpa']" routerLinkActive="active">Korpa</a>
        <a [routerLink]="['/profil']" routerLinkActive="active" *ngIf="auth.isLoggedIn()">Profil</a>
      </div>
      <div class="nav">
        <span *ngIf="auth.isLoggedIn()">
          👤 {{ auth.currentUser()?.firstName }} {{ auth.currentUser()?.lastName }}
          <span *ngIf="auth.currentUser()?.profile?.omiljeniZanrovi?.length">
            | Žanrovi: {{ auth.currentUser()?.profile?.omiljeniZanrovi?.join(', ') }}
          </span>
        </span>
        <ng-container *ngIf="!auth.isLoggedIn()">
          <a class="btn" [routerLink]="['/prijava']">Prijava</a>
          <a class="btn secondary" [routerLink]="['/registracija']">Registracija</a>
        </ng-container>
        <button *ngIf="auth.isLoggedIn()" class="btn secondary" (click)="odjava()">Odjava</button>
      </div>
    </div>
  </header>
  <main class="container">
    <router-outlet></router-outlet>
  </main>
  <footer class="container" style="opacity:.6; margin-top:24px;">
    <small>KVA semestralni projekat – digitalni šalter bioskopa (prototip)</small>
  </footer>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) {}
  odjava(){ this.auth.logout(); }
}