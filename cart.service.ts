import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Movie, Projekcija, StatusProjekcije } from '../models/models';
import { MoviesService } from './movies.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private key = 'kva_cart';
  private _items = signal<CartItem[]>(this.load());
  items = this._items.asReadonly();
  total = computed(() => this._items().reduce((s, it) => s + it.projekcija.cena, 0));

  constructor(private movies: MoviesService, private auth: AuthService) {}

  private load(): CartItem[] {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }
  private save(){ localStorage.setItem(this.key, JSON.stringify(this._items())); }

  add(projekcija: Projekcija){
    const movie = this.movies.getById(projekcija.movieId);
    if(!movie) return;
    const item: CartItem = { projekcija: { ...projekcija, status: 'rezervisano' }, movie };
    this._items.update(list => [...list, item]);
    this.save();
    alert('Projekcija rezervisana i dodata u korpu.');
  }

  setStatus(projekcijaId: number, status: StatusProjekcije){
    this._items.update(list => list.map(it => it.projekcija.id === projekcijaId ? ({ ...it, projekcija: { ...it.projekcija, status }}) : it));
    this.save();
  }

  delete(projekcijaId: number){
    const item = this._items().find(i => i.projekcija.id === projekcijaId);
    if(item?.projekcija.status !== 'gledano'){
      this._items.update(list => list.filter(i => i.projekcija.id !== projekcijaId));
      this.save();
    } else {
      alert('Brisanje nije dozvoljeno za status "gledano".');
    }
  }

  updateCena(projekcijaId: number, novaCena: number){
    this._items.update(list => list.map(it => it.projekcija.id === projekcijaId ? ({ ...it, projekcija: { ...it.projekcija, cena: novaCena }}) : it));
    this.save();
  }

  rate(projekcijaId: number, ocena: number){
    this._items.update(list => list.map(it => it.projekcija.id === projekcijaId && it.projekcija.status === 'gledano'
      ? ({ ...it, projekcija: { ...it.projekcija, ocena }}) : it));
    this.save();
  }

  clear(){ this._items.set([]); this.save(); }
}