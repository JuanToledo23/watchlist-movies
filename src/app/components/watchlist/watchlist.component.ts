import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { WatchListService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  user: string | null = localStorage.getItem('user');
  movies: Array<any> = [];

  constructor(private watchListService: WatchListService, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.watchListService.getMovies(this.user).subscribe(response => {
      this.movies = [];
      response.forEach((element: any) => {
        this.movies.push({
          idF: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
      this.movies.sort(this.moviesService.topRated)
    })
  }

}
