import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { WatchListService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Array<any> = []
  page: number = 1;
  maxPage: number = 0;
  id: number = 0;

  user: string | null = localStorage.getItem('user');

  constructor(public moviesService: MoviesService, private watchListService: WatchListService) { }

  ngOnInit(): void {
   this.getMovies(this.id, false);
  }

  getMovies(id: number, clean: boolean): void {
    this.id = id
    if(clean) {
      this.page = 1;
      this.movies = [];
    }
     
    switch (this.id) {
      case 0:
        this.moviesService.getTopRatedMovies(this.page).subscribe(res => {
          this.addElements(res)
        })
      break;
      case 1:
        this.moviesService.getNowPlayingMovies(this.page).subscribe(res => {
          this.addElements(res)
        })
      break;
      case 2:
        this.moviesService.getPopularMovies(this.page).subscribe(res => {
          this.addElements(res)
        })
      break;
      case 3:
        this.moviesService.getUpcomingMovies(this.page).subscribe(res => {
          this.addElements(res)
        })
      break;
    
      default:
        break;
    }
  }

  addElements(res: any) {
    this.maxPage = res.total_pages;
    res.results.forEach((element: any) => {
      this.movies.push({...element, watchlist: false})
    });
    this.watchListValidate();
    console.log(this.movies)
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
      this.getMovies(this.id, false);
    }
  }

  topRated() {
    this.movies.sort(this.moviesService.topRated)
  }

  worstRated() {
    this.movies.sort(this.moviesService.worstRated)
  }

}
