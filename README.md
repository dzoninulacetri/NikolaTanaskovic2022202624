# KVA – Digitalni šalter bioskopa (prototip)

Prototip veb klijentske aplikacije (Angular 17, standalone komponente) sa simulacijom pozadinske logike preko TypeScript interfejsa i servisa.

## Pokretanje
```bash
npm install
npm start
```
Otvorite http://localhost:4200/ u pregledaču.

### Demo nalog
- Email: `test@example.com`
- Lozinka: `test123`

## Struktura
- `src/app/models/models.ts` – interfejsi (Movie, Projekcija, Review, Profile, User, CartItem, enum-i)
- `src/app/services/mock-data.ts` – min. 10 filmova sa projekcijama i recenzijama
- `src/app/services/movies.service.ts` – pretraga po svim kriterijumima, prosečna ocena, dodavanje recenzije
- `src/app/services/auth.service.ts` – registracija, prijava, profil (localStorage simulacija)
- `src/app/services/cart.service.ts` – korpa (rezervisano/gledano/otkazano), izmena cene, ocena (samo za gledano), ukupna cena
- `src/app/components/*` – stranice: projekcije (pretraga), detalji filma (rezervacija), korpa, prijava, registracija, profil
- `src/styles.css` – jednostavna, moderna tamna tema

## Napomene
- Pretraga radi *odvojeno po kriterijumima*: uneti šta želite, ostavite prazno za "sve".
- Rezervacija je omogućena samo prijavljenim korisnicima.
- Ocenu je moguće uneti samo kada je status projekcije *gledano* (u korpi).
- Brisanje projekcije nije dozvoljeno kada je status *gledano* (po uslovu zadatka).
- Sva logika je simulirana u memoriji + localStorage u toku jedne sesije.

## Dokument za predaju (PDF)
U `docs/` se nalazi markdown šablon `Semestralni-izvestaj.md`. Dodajte screenshot svakog ekrana i kratak opis **funkcije** ekrana (ne rasporeda kontrola). Zatim eksportujte u PDF.