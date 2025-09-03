import { Injectable, signal } from '@angular/core';
import { Profile, User } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'kva_users';
  private currentKey = 'kva_current_user';
  private _current = signal<User | null>(this.loadCurrent());

  currentUser = this._current.asReadonly();

  private loadCurrent(): User | null {
    const raw = localStorage.getItem(this.currentKey);
    return raw ? JSON.parse(raw) : null;
  }

  private saveCurrent(u: User | null){
    if(u) localStorage.setItem(this.currentKey, JSON.stringify(u));
    else localStorage.removeItem(this.currentKey);
    this._current.set(u);
  }

  isLoggedIn(){ return !!this._current(); }

  currentUserId(): number | null { return this._current()?.id ?? null; }

  private loadUsers(): User[] {
    const raw = localStorage.getItem(this.usersKey);
    if(!raw) {
      const seed: User[] = [
        { id: 1, password: 'test123', profile: { firstName: 'Test', lastName: 'Korisnik', email: 'test@example.com', omiljeniZanrovi: ['drama'] } }
      ];
      localStorage.setItem(this.usersKey, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  }

  private saveUsers(users: User[]){
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  login(email: string, password: string): boolean {
    const u = this.loadUsers().find(u => u.profile.email === email && u.password === password);
    if(u){ this.saveCurrent(u); return true; }
    return false;
  }

  register(profile: Profile, password: string): string | true {
    const users = this.loadUsers();
    if(users.some(u => u.profile.email === profile.email)) return 'Email je već registrovan.';
    const id = Math.max(...users.map(u=>u.id), 0) + 1;
    const newUser: User = { id, profile, password };
    users.push(newUser);
    this.saveUsers(users);
    this.saveCurrent(newUser);
    return true;
  }

  updateProfile(patch: Partial<Profile>){
    const u = this._current();
    if(!u) return;
    const users = this.loadUsers();
    const idx = users.findIndex(x => x.id === u.id);
    if(idx >= 0){
      users[idx].profile = { ...users[idx].profile, ...patch };
      this.saveUsers(users);
      this.saveCurrent(users[idx]);
    }
  }

  logout(){ this.saveCurrent(null); }
}