export type Zanr = 'komedija' | 'drama' | 'avantura' | 'akcija' | 'triler' | 'sci-fi' | 'horor' | 'romansa' | 'animirani';

export type StatusProjekcije = 'rezervisano' | 'gledano' | 'otkazano';

export interface Review {
  userId: number;
  rating: number; // 1-5
  comment?: string;
  date: string;
}

export interface Projekcija {
  id: number;
  movieId: number;
  datetime: string; // ISO
  cena: number;
  sala: string;
  status?: StatusProjekcije; // samo u korpi korisnika
  ocena?: number; // samo za 'gledano' korisnika
}

export interface Movie {
  id: number;
  naziv: string;
  opis: string;
  zanr: Zanr[];
  trajanjeMin: number;
  reziser: string;
  glumci: string[];
  datumIzlaska: string; // ISO date
  projekcije: Projekcija[];
  reviews: Review[];
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  omiljeniZanrovi?: Zanr[];
}

export interface User {
  id: number;
  profile: Profile;
  password: string;
}

export interface CartItem {
  projekcija: Projekcija;
  movie: Movie;
}