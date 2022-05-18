import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    url: string = 'https://api.themoviedb.org/3/movie/';
    valueButtons: string = 'top';

    constructor(private http: HttpClient) { }

    getUpcomingMovies(page: number = 1) : Observable<any> {
        let url = this.url + 'upcoming?api_key=' + environment.api_key + '&language=en-US&page=' + page;
        return this.http.get<any>(url);
    }

    getPopularMovies(page: number = 1) : Observable<any> {
        let url = this.url + 'popular?api_key=' + environment.api_key + '&language=en-US&page=' + page;
        return this.http.get<any>(url);
    }

    getTopRatedMovies(page: number = 1) : Observable<any> {
        let url = this.url + 'top_rated?api_key=' + environment.api_key + '&language=en-US&page=' + page;
        return this.http.get<any>(url);
    }

    getNowPlayingMovies(page: number = 1) : Observable<any> {
        let url = this.url + 'now_playing?api_key=' + environment.api_key + '&language=en-US&page=' + page;
        return this.http.get<any>(url);
    }

    getMovieById(id: any) {
        let url = this.url + id + '?api_key=' + environment.api_key + '&language=en-US';
        return this.http.get<any>(url);
    }

    getSimilarMovies(id: any, page: number = 1) : Observable<any> {
        let url = this.url + id + '/similar?api_key=' + environment.api_key + '&language=en-US&page=' + page;
        return this.http.get<any>(url);
    }

    topRated(x: any, y: any){
        if (x.vote_average > y.vote_average) {return -1;}
        if (x.vote_average < y.vote_average) {return 1;}
        return 0;
    }

    worstRated(x: any, y: any){
        if (x.vote_average < y.vote_average) {return -1;}
        if (x.vote_average > y.vote_average) {return 1;}
        return 0;
    }

}