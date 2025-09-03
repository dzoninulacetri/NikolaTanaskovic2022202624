import { Injectable, signal } from '@angular/core';
import { MOVIES } from './mock-data';
import { Movie, Projekcija, Review, Zanr } from '../models/models';

export interface SearchCriteria {
  naziv?: string;
  opis?: string;
  zanr?: Zanr;
  minTrajanje?: number;
  maxTrajanje?: number;
  reziser?: string;
  glumac?: string;
  datumIzlaska?: string;   // yyyy-mm-dd
  datumProjekcije?: string; // yyyy-mm-dd
  minCena?: number;
  maxCena?: number;
  minOcena?: number;       // prosečna ocena
}

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private _movies = signal<Movie[]>(MOVIES);
  movies = this._movies.asReadonly();

  getById(id: number) { return this._movies().find(m => m.id === id) ?? null; }

  avgRating(m: Movie): number {
    if (!m.reviews?.length) return 0;
    return Math.round((m.reviews.reduce((s, r) => s + r.rating, 0) / m.reviews.length) * 10) / 10;
  }

  search(c: SearchCriteria): Movie[] {
    const minC = c.minCena ?? -Infinity;
    const maxC = c.maxCena ?? Infinity;

    return this._movies().filter(m => {
      const matches =
        (!c.naziv || m.naziv.toLowerCase().includes(c.naziv.toLowerCase())) &&
        (!c.opis || m.opis.toLowerCase().includes(c.opis.toLowerCase())) &&
        (!c.zanr || m.zanr.includes(c.zanr)) &&
        (!c.minTrajanje || m.trajanjeMin >= c.minTrajanje) &&
        (!c.maxTrajanje || m.trajanjeMin <= c.maxTrajanje) &&
        (!c.reziser || m.reziser.toLowerCase().includes(c.reziser.toLowerCase())) &&
        (!c.glumac || m.glumci.some(g => g.toLowerCase().includes((c.glumac ?? '').toLowerCase()))) &&
        (!c.datumIzlaska || m.datumIzlaska === c.datumIzlaska) &&
        (!c.minOcena || this.avgRating(m) >= c.minOcena) &&
        (!c.datumProjekcije || m.projekcije.some(p => p.datetime.slice(0, 10) === c.datumProjekcije)) &&
        (m.projekcije.some(p => p.cena >= minC)) &&
        (m.projekcije.some(p => p.cena <= maxC));
      return matches;
    });
  }

  addReview(movieId: number, r: Review) {
    this._movies.update(list =>
      list.map(m => m.id === movieId ? ({ ...m, reviews: [...m.reviews, r] }) : m)
    );
  }
}
