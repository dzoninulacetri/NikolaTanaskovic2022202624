import { Movie, Projekcija, Review, Zanr } from '../models/models';

// Pomoćna funkcija za kreiranje datuma projekcija (danas + offset dana)
function futureDate(daysFromNow: number, hour: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

const baseMovies: Omit<Movie, 'id' | 'projekcije' | 'reviews'>[] = [
  { naziv: 'Nebeska Kapija', opis: 'Epska drama o sukobu interesa u malom gradu.', zanr: ['drama'], trajanjeMin: 165, reziser: 'M. Cimino', glumci: ['K. Kristofferson','C. Walken'], datumIzlaska: '1980-11-19' },
  { naziv: 'Smeh do suza', opis: 'Komedija o prijateljstvu i nesporazumima.', zanr: ['komedija'], trajanjeMin: 102, reziser: 'J. Apatow', glumci: ['S. Rogen','P. Rudd'], datumIzlaska: '2007-08-17' },
  { naziv: 'Marinac', opis: 'Akcioni triler o spasavanju taoca.', zanr: ['akcija','triler'], trajanjeMin: 119, reziser: 'K. Bigelow', glumci: ['J. Renner','E. Blunt'], datumIzlaska: '2010-03-12' },
  { naziv: 'Zvezdana prašina', opis: 'Sci-fi avantura kroz vreme i prostor.', zanr: ['sci-fi','avantura'], trajanjeMin: 128, reziser: 'D. Villeneuve', glumci: ['R. Gosling','A. Adams'], datumIzlaska: '2017-10-06' },
  { naziv: 'Mala Noćna Mora', opis: 'Horor misterija u izolovanom selu.', zanr: ['horor','triler'], trajanjeMin: 98, reziser: 'A. Aster', glumci: ['F. Pugh','W. Poulter'], datumIzlaska: '2019-07-03' },
  { naziv: 'Srce od leda', opis: 'Animirana porodična priča.', zanr: ['animirani','avantura'], trajanjeMin: 93, reziser: 'J. Lee', glumci: ['I. Menzel','K. Bell'], datumIzlaska: '2013-11-27' },
  { naziv: 'Ljubav na krovu', opis: 'Romansa dvoje suseda na krovu zgrade.', zanr: ['romansa','komedija'], trajanjeMin: 105, reziser: 'R. Linklater', glumci: ['Z. Levi','E. Blunt'], datumIzlaska: '2015-06-12' },
  { naziv: 'Senke grada', opis: 'Noir triler o detektivu.', zanr: ['triler','drama'], trajanjeMin: 111, reziser: 'D. Fincher', glumci: ['J. Gyllenhaal','R. Downey Jr.'], datumIzlaska: '2007-03-02' },
  { naziv: 'Planina snova', opis: 'Drama o odrastanju u planinama.', zanr: ['drama'], trajanjeMin: 122, reziser: 'A. Lee', glumci: ['H. Ledger','J. Gyllenhaal'], datumIzlaska: '2005-12-09' },
  { naziv: 'Galaktički Kurir', opis: 'Brza avantura mladića pilota.', zanr: ['sci-fi','akcija'], trajanjeMin: 115, reziser: 'J. Gunn', glumci: ['C. Pratt','Z. Saldana'], datumIzlaska: '2014-08-01' }
];

export const MOVIES: Movie[] = baseMovies.map((m, idx) => {
  const id = idx + 1;
  const projekcije: Projekcija[] = [
    { id: id*10+1, movieId: id, datetime: futureDate(1, 18), cena: 450, sala: 'Sala 1' },
    { id: id*10+2, movieId: id, datetime: futureDate(2, 20), cena: 500, sala: 'Sala 2' },
    { id: id*10+3, movieId: id, datetime: futureDate(5, 21), cena: 550, sala: 'Sala 1' }
  ];
  const reviews: Review[] = [
    { userId: 1, rating: (idx%5)+1, comment: 'Odlično!', date: '2024-10-01' },
    { userId: 2, rating: ((idx+2)%5)+1, comment: 'Solidno.', date: '2024-11-15' }
  ];
  return { id, projekcije, reviews, ...m };
});