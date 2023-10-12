import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public beer: any;
  public fetchedData: any[];

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.fetchedData = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.beer = this.dataService
        .getFetchedData()
        .find((x) => x.id == res['id']);
    });
  }
}
