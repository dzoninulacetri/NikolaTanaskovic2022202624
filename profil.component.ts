import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Zanr } from '../models/models';

@Component({
  standalone: true,
  selector: 'app-profil',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card" *ngIf="auth.currentUser() as u">
    <h2>Lični profil</h2>
    <div class="grid">
      <input class="input" [(ngModel)]="u.profile.firstName" placeholder="Ime">
      <input class="input" [(ngModel)]="u.profile.lastName" placeholder="Prezime">
      <input class="input" [(ngModel)]="u.profile.email" placeholder="Email" disabled>
      <input class="input" [(ngModel)]="u.profile.phone" placeholder="Telefon">
      <input class="input" [(ngModel)]="u.profile.address" placeholder="Adresa">

      <label>Omiljeni žanrovi:</label>
      <div style="display:flex; flex-wrap: wrap; gap:8px; margin-bottom:12px;">
        <label *ngFor="let z of zanrovi">
          <input type="checkbox"
            [value]="z"
            [checked]="u.profile.omiljeniZanrovi?.includes(z)"
            (change)="toggleZanr(u, z, $event)">
          {{ z }}
        </label>
      </div>
      <button class="btn" (click)="sacuvaj(u.profile)">Sačuvaj</button>
    </div>
  </div>
  `
})
export class ProfilComponent {
  zanrovi: Zanr[] = ['komedija','drama','avantura','akcija','triler','sci-fi','horor','romansa','animirani'];
  constructor(public auth: AuthService){}
  toggleZanr(u: any, z: Zanr, e: any){
    if(e.target.checked){
      if(!u.profile.omiljeniZanrovi) u.profile.omiljeniZanrovi = [];
      if(!u.profile.omiljeniZanrovi.includes(z)) u.profile.omiljeniZanrovi.push(z);
    } else {
      u.profile.omiljeniZanrovi = u.profile.omiljeniZanrovi.filter((x: Zanr) => x!==z);
    }
  }
  sacuvaj(patch: any){ this.auth.updateProfile(patch); alert('Profil sačuvan.'); }
}