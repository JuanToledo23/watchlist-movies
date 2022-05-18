import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { WatchListService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: any;

  movies: Array<any> = []
  page: number = 1;
  maxPage: number = 0;
  id: number = 0;

  user: string | null = localStorage.getItem('user');
  
  constructor(private moviesService: MoviesService, 
    private activateRoute: ActivatedRoute,
    private watchListService: WatchListService) { }

  ngOnInit(): void {
    this.moviesService.getMovieById(this.activateRoute.snapshot.paramMap.get('id')).subscribe(res => {
      this.movie = res;
    })
    this.getSimilarMovies();
  }

  getSimilarMovies() {
    this.moviesService.getSimilarMovies(this.activateRoute.snapshot.paramMap.get('id'), this.page).subscribe(res => {
      this.addElements(res)
    })
  }

  addElements(res: any) {
    this.maxPage = res.total_pages;
    res.results.forEach((element: any) => {
      this.movies.push({...element, watchlist: false})
    });
    //this.movies.sort(this.sortArray)

    this.watchListValidate();
  }

  watchListValidate() {
    this.watchListService.getMovies(this.user).subscribe(response => {
      response.forEach((element: any) => {
        this.movies.forEach(movie => {
          if(movie.id === element.payload.doc.data().id) {
            movie.idF = element.payload.doc.id;
            movie.watchlist = element.payload.doc.data().watchlist
          }
        });
      })
    })
  }

  onScrollDown(): void {
    this.page++;
    if(this.page <= this.maxPage) {
      this.getSimilarMovies();
    }
  }

}
