import { Routes } from '@angular/router';
import { ProjekcijeComponent } from './components/projekcije.component';
import { DetaljiFilmaComponent } from './components/detalji-filma.component';
import { KorpaComponent } from './components/korpa.component';
import { PrijavaComponent } from './components/prijava.component';
import { RegistracijaComponent } from './components/registracija.component';
import { ProfilComponent } from './components/profil.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'projekcije' },
  { path: 'projekcije', component: ProjekcijeComponent },
  { path: 'film/:id', component: DetaljiFilmaComponent },
  { path: 'korpa', component: KorpaComponent, canActivate: [authGuard] },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'projekcije' }
];

