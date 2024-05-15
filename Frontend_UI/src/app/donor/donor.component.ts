import { Component, inject, OnInit } from '@angular/core';
import { Donor } from '../../../../Models';
import { DonorService } from '../services/donor.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './donor.component.html',
  styleUrl: './donor.component.css',
  providers:[DonorService]
})
export class DonorComponent implements OnInit{
  constructor(private donorService:DonorService){}
  router = inject(Router);
goToDonorForm(id?:string) {
  this.router.navigate([ '/editdonor', id ]);
}
  donors:Array<Donor> = [];
  ngOnInit(): void {
    this.donorService.GetDonors().subscribe({
      next:(donorsA) =>{
        this.donors = donorsA;
        console.log(this.donors);
      },
      error:(err) =>{
        console.log(err);
      }
    });
  }
  addDonor(){
    this.router.navigate([ '/editdonor']);
  }

}
