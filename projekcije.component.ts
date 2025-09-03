import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MoviesService, SearchCriteria } from '../services/movies.service';

@Component({
  standalone: true,
  selector: 'app-projekcije',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div class="card">
    <h2>Pretraga projekcija</h2>
    <form class="grid" (ngSubmit)="0">
      <input class="input" placeholder="Naziv" [(ngModel)]="c.naziv" name="naziv">
      <input class="input" placeholder="Opis" [(ngModel)]="c.opis" name="opis">
      <select class="input" [(ngModel)]="c.zanr" name="zanr">
        <option [ngValue]="undefined">Žanr (svi)</option>
        <option *ngFor="let z of zanrovi" [ngValue]="z">{{ z }}</option>
      </select>
      <input class="input" type="number" min="0" placeholder="Min trajanje (min)" [(ngModel)]="c.minTrajanje" name="minTrajanje">
      <input class="input" type="number" min="0" placeholder="Max trajanje (min)" [(ngModel)]="c.maxTrajanje" name="maxTrajanje">
      <input class="input" placeholder="Režiser" [(ngModel)]="c.reziser" name="reziser">
      <input class="input" placeholder="Glumac" [(ngModel)]="c.glumac" name="glumac">
      <input class="input" type="date" placeholder="Datum izlaska" [(ngModel)]="c.datumIzlaska" name="datumIzlaska">
      <input class="input" type="date" placeholder="Datum projekcije" [(ngModel)]="c.datumProjekcije" name="datumProjekcije">
      <input class="input" type="number" min="0" placeholder="Min cena" [(ngModel)]="c.minCena" name="minCena">
      <input class="input" type="number" min="0" placeholder="Max cena" [(ngModel)]="c.maxCena" name="maxCena">
      <input class="input" type="number" min="0" max="5" step="0.1" placeholder="Min ocena" [(ngModel)]="c.minOcena" name="minOcena">
    </form>
  </div>

  <div style="height: 12px;"></div>

  <div class="grid">
    <div class="card" *ngFor="let m of results()">
      <div style="display:flex; justify-content:space-between; align-items:center">
        <h3 style="margin:0;">{{ m.naziv }}</h3>
        <span class="badge">{{ m.trajanjeMin }} min</span>
      </div>
      <p class="badge">Žanr: {{ m.zanr.join(', ') }}</p>
      <p style="opacity:.8">{{ m.opis }}</p>
      <p class="badge">Režiser: {{ m.reziser }}</p>
      <p class="badge">Glumci: {{ m.glumci.join(', ') }}</p>
      <p>Datum izlaska: {{ m.datumIzlaska }}</p>
      <p>Prosečna ocena: <span class="rating">★</span> {{ avg(m) || 'N/A' }}</p>
      <a class="btn" [routerLink]="['/film', m.id]">Detalji & rezervacija</a>
    </div>
  </div>
  `
})
export class ProjekcijeComponent {
  constructor(public movies: MoviesService) {}
  c: SearchCriteria = {};
  zanrovi = ['komedija','drama','avantura','akcija','triler','sci-fi','horor','romansa','animirani'] as const;

  results(){ return this.movies.search(this.c); }
  avg(m:any){ return this.movies.avgRating(m); }
}