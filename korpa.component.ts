import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-korpa',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Vaša korpa</h2>
    <table class="table" *ngIf="cart.items().length">
      <thead><tr><th>Film</th><th>Termin</th><th>Cena</th><th>Status</th><th>Ocena (ako gledano)</th><th></th></tr></thead>
      <tbody>
        <tr *ngFor="let it of cart.items()">
          <td>{{ it.movie.naziv }}</td>
          <td>{{ it.projekcija.datetime | date:'dd.MM.yyyy. HH:mm' }}</td>
          <td>
            <input type="number" class="input" [ngModel]="it.projekcija.cena" (ngModelChange)="cart.updateCena(it.projekcija.id, $event)">
          </td>
          <td>
            <select class="input" [ngModel]="it.projekcija.status" (ngModelChange)="cart.setStatus(it.projekcija.id, $event)">
              <option value="rezervisano">rezervisano</option>
              <option value="gledano">gledano</option>
              <option value="otkazano">otkazano</option>
            </select>
          </td>
          <td>
            <input type="number" class="input" min="1" max="5" [disabled]="it.projekcija.status !== 'gledano'"
              [ngModel]="it.projekcija.ocena || null" (ngModelChange)="cart.rate(it.projekcija.id, $event)">
          </td>
          <td><button class="btn secondary" (click)="cart.delete(it.projekcija.id)">Ukloni</button></td>
        </tr>
      </tbody>
    </table>
    <p *ngIf="!cart.items().length">Korpa je prazna.</p>
    <h3>Ukupno: {{ cart.total() | currency:'RSD':'symbol':'1.0-0' }}</h3>
  </div>
  `
})
export class KorpaComponent {
  constructor(public cart: CartService){}
}