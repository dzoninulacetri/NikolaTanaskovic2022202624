import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-detalji-filma',
  imports: [CommonModule],
  template: `
  <ng-container *ngIf="m; else notfound">
    <div class="card">
      <h2>{{ m.naziv }}</h2>
      <p class="badge">Žanr: {{ m.zanr.join(', ') }}</p>
      <p>{{ m.opis }}</p>
      <p class="badge">Režiser: {{ m.reziser }}</p>
      <p class="badge">Glumci: {{ m.glumci.join(', ') }}</p>
      <p>Datum izlaska: {{ m.datumIzlaska }}</p>
      <h3>Termini i cena</h3>
      <table class="table">
        <thead><tr><th>Datum i vreme</th><th>Sala</th><th>Cena</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let p of m.projekcije">
            <td>{{ p.datetime | date:'dd.MM.yyyy. HH:mm' }}</td>
            <td>{{ p.sala }}</td>
            <td>{{ p.cena | currency:'RSD':'symbol':'1.0-0' }}</td>
            <td><button class="btn" (click)="rezervisi(p.id)">Rezerviši</button></td>
          </tr>
        </tbody>
      </table>
      <h3>Recenzije</h3>
      <p *ngIf="!m.reviews?.length">Nema recenzija.</p>
      <div *ngFor="let r of m.reviews" class="card" style="padding:12px; margin: 8px 0;">
        <div class="rating">★ {{ r.rating }}</div>
        <div style="opacity:.8">{{ r.comment }}</div>
        <small style="opacity:.6">{{ r.date }}</small>
      </div>
    </div>
  </ng-container>
  <ng-template #notfound>
    <p>Film nije pronađen.</p>
  </ng-template>
  `
})
export class DetaljiFilmaComponent {
  m = this.movies.getById(Number(this.route.snapshot.paramMap.get('id')));
  constructor(private route: ActivatedRoute, private movies: MoviesService, private cart: CartService, private auth: AuthService){}

  rezervisi(projekcijaId: number){
    if(!this.auth.isLoggedIn()){
      alert('Morate biti prijavljeni da biste rezervisali.');
      return;
    }
    const p = this.m?.projekcije.find(p => p.id === projekcijaId);
    if(p) this.cart.add(p);
  }
}