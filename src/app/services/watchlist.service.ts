import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WatchListService {

    constructor(private firestore: AngularFirestore) { }

    addMovie(collection: any, movie: any): Promise<any>  {
        return this.firestore.collection(collection).add(movie);
    }

    getMovies(collection: any): Observable<any> {
        return this.firestore.collection(collection).snapshotChanges();
    }
    
    deleteMovie(collection: any, document: any) {
        this.firestore.collection(collection).doc(document).delete();
    }
}