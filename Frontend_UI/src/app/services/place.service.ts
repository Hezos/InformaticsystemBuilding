
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Place } from '../../../../Models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})


export class PlaceService {

  constructor(private http:HttpClient){}
  GetPlaces()
  {
    return this.http.get<Place[]>('http://localhost:3000/api/place');
  }

  RegisterPlace(place:Place):Observable<Place>
  {
    return this.http.post<Place>('http://localhost:3000/api/place', place, httpOptions).pipe(tap((newPlace:Place) =>{
      console.log('Added new place.');
    }));
  }
  UpdatePlace(place:Place):Observable<Place>{
    return this.http.post<Place>('http://localhost:3000/api/place/update', place, httpOptions);
  }

  GetOne(id?:string){
    return this.http.post<Place>('http://localhost:3000/api/place/getById', {_id:id}, httpOptions).pipe(tap((newPlace:Place) =>{
      console.log('Place found');
    }));
  }

  GetActives(){
    return this.http.get<Array<string>>('http://localhost:3000/api/place/actives');
  }  
}
