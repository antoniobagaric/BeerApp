import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: string[] = [];

  constructor() {
    const sessionFavorites = sessionStorage.getItem('favorites');
    if (sessionFavorites) {
      this.favorites = JSON.parse(sessionFavorites);
    }
  }

  getFavorites(): string[] {
    return this.favorites;
  }

  addFavorites(beerId: string): void {
    if (!this.favorites.includes(beerId)) {
      this.favorites.push(beerId);
      this.saveFavorites();
    }
  }

  removeFavorites(beerId: string): void {
    this.favorites = this.favorites.filter((favorite) => favorite !== beerId);
    this.saveFavorites();
  }

  saveFavorites(): void {
    sessionStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
