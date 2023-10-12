import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { FavoritesService } from '../favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private title = 'BeerApp';
  private url: string = 'https://api.punkapi.com/v2/beers';
  private scrollPosition: number = 0;
  public filteredBeers: any[] = [];
  public searchBeer: string = '';
  public sliderValuemin: number = 0;
  public sliderValuemax: number = 100;
  private favorites: { [beerId: string]: boolean } = {};
  private favUrl: string = '/assets/star-selected-24px.svg';
  private notFavUrl: string = '/assets/star_outline-24px.svg';
  public isChecked: boolean = false;
  public sortBy: string = 'Select an option';

  public data: any;

  constructor(
    private dataService: DataService,
    private favoriteService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    fetch(this.url)
      .then((response) => response.json())
      .then((res) => {
        this.data = res;
        this.dataService.setFetchedData(this.data);
        this.scrollPosition = this.dataService.scrollY;
        this.filteredBeers = this.data;
      })
      .then(() =>
        setTimeout(() => {
          window.scrollTo(0, this.scrollPosition);
        }, 300)
      )
      .catch((error) => {
        console.error(error);
      });
  }

  sortBeers(): void {
    if (this.sortBy === 'name') {
      this.filteredBeers = this.filteredBeers.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
    } else if (this.sortBy === 'abv') {
      this.filteredBeers = this.filteredBeers.sort((a, b) => a.abv - b.abv);
    }
  }

  isFavoriteImage(beerId: string): string {
    if (this.isFavorite(beerId)) {
      return this.favUrl;
    } else {
      return this.notFavUrl;
    }
  }

  filterFavorites(): void {
    if (this.isChecked) {
      this.filteredBeers = this.data.filter((beer: any) =>
        this.isFavorite(beer.id)
      );
    } else {
      this.filteredBeers = this.data;
    }
  }

  toggleFavorite(beerId: string): void {
    if (this.isFavorite(beerId)) {
      this.favorites[beerId] = false;
      this.removeFromFavorites(beerId);
    } else {
      this.addToFavorites(beerId);
      this.favorites[beerId] = true;
    }
  }

  isFavorite(beerId: string): boolean {
    return this.favoriteService.getFavorites().includes(beerId);
  }

  addToFavorites(beerId: string): void {
    this.favoriteService.addFavorites(beerId);
  }

  removeFromFavorites(beerId: string): void {
    this.favoriteService.removeFavorites(beerId);
  }

  toggleDetails(item: any) {
    this.router.navigate(['detail', item]);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    this.dataService.scrollY = window.scrollY;
  }

  filterBeers() {
    if (this.searchBeer) {
      this.filteredBeers = this.data.filter((beer: any) =>
        beer.name.toLowerCase().includes(this.searchBeer.toLowerCase())
      );
    } else {
      this.filteredBeers = this.data;
    }
  }

  updateContent() {
    this.filteredBeers = this.data.filter(
      (beer: any) =>
        beer.abv <= this.sliderValuemax && beer.abv >= this.sliderValuemin
    );
  }
}
