import { Component, Input, OnInit } from '@angular/core';
import { WatchListService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  user: string | null = localStorage.getItem('user');
  @Input() info: any = '';

  constructor(private watchListService: WatchListService) { }

  ngOnInit(): void {
  }

  addMovie() {
    this.info.watchlist = true;
    this.watchListService.addMovie(this.user, {...this.info, watchlist: true});
  }

  deleteMovie(id: any) {
    this.info.watchlist = false;
    this.watchListService.deleteMovie(this.user, id);
  }

}
