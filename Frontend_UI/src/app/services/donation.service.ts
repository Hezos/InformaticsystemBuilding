import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Donation } from '../../../../Models';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})



export class DonationService {

  constructor(private http:HttpClient) { }
  getDonations():Observable<Donation[]>{
    return this.http.get<Donation[]>('http://localhost:3000/api/donation');
  }
  RegisterDonation(donation:Donation):Observable<Donation>{
    return this.http.post<Donation>('http://localhost:3000/api/donation', donation, httpOptions).pipe(tap((newDonation:Donation) =>{
      console.log('Donation added.');
    }));
  }
  getOneDonation(id?:string):Observable<Donation>{
    return this.http.post<Donation>('http://localhost:3000/api/donation/getById',{_id:id}, httpOptions).pipe(tap((newDonation:Donation) =>{
      console.log('Donation added.');
    }));
  }
  
  UpdateDonation(donation:Donation):Observable<Donation>{
    return this.http.post<Donation>('http://localhost:3000/api/donation', donation, httpOptions);
  }

  getActives():Observable<Donation[]>{
    return this.http.post<Donation[]>('',{},httpOptions);
  }

  getByPatient(patient:string):Observable<Donation[]>{
    return this.http.post<Donation[]>('', {patient:patient}, httpOptions);
  }

  getByStartDate(start:string):Observable<Donation[]>{
    return this.http.post<Donation[]>('', {date:start}, httpOptions);
  }

  getByAddress(address:string):Observable<Donation[]>{
    return this.http.post<Donation[]>('', {address:address}, httpOptions);
  }

  getByEndDate(end:string):Observable<Donation[]>{
    return this.http.post<Donation[]>('', {endDate:end}, httpOptions);
  }

}
