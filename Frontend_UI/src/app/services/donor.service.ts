import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donor } from '../../../../Models';
import { Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})


export class DonorService {
  constructor(private http:HttpClient){}
  GetDonors():Observable<Donor[]>
  {
    return this.http.get<Donor[]>('http://localhost:3000/api/donor');
  }

  GetOne(id?:string){
    return this.http.post<Donor>('http://localhost:3000/api/donor/getById', {_id:id}, httpOptions).pipe(tap((newDonor:Donor) =>{
    }));
  }


  RegisterDonor(donor:Donor):Observable<Donor>
  {
    return this.http.post<Donor>('http://localhost:3000/api/donor', donor, httpOptions);
  }

  UpdateDonor(donor:Donor):Observable<Donor>{
    return this.http.post<Donor>('http://localhost:3000/api/donor/update', donor, httpOptions);
  }

  GetNames(){
    return this.http.get<Array<string>>('http://localhost:3000/api/place/getById');
  }
}
