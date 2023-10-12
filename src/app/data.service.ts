import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public scrollY: number = 0;
  private fetchedData: any[] = [];

  setFetchedData(data: any) {
    this.fetchedData = data;
  }

  getFetchedData() {
    return this.fetchedData;
  }

  constructor() {}
}
