import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { DonationService } from '../services/donation.service';
import { Router } from '@angular/router';
import { Donation } from '../../../../Models';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css',
  providers:[DonationService]
})
export class DonationComponent implements OnInit {
  resultString:string = "";
  hasResult:boolean = false;
onEnter(type:number, arg0: string) {
  switch(type){
    case 1:
      this.donationService.getByPatient(arg0).subscribe({
        next:(result) =>{
          if(result.length != 0){
            this.donations = result;
            this.hasResult = true;
          }
          else{
            this.resultString = "Didn't find any elements";
            this.hasResult = false;
          }
        }
      });
      break;
    case 2:
      this.donationService.getByAddress(arg0).subscribe({
        next:(result)=>{
          if(result.length != 0){
            this.donations = result;
            this.hasResult = true;
          }
          else{
            this.resultString = "Didn't find any elements";
            this.hasResult = false;
          }
        }
      });
      break;
    case 3:
      this.donationService.getByStartDate(arg0).subscribe({
        next:(result) =>{
          if(result.length != 0){
            this.donations = result;
            this.hasResult = true;
          }
          else{
            this.resultString = "Didn't find any elements";
            this.hasResult = false;
          }
        }
      });
      break;
    case 4:
      this.donationService.getByEndDate(arg0).subscribe({
        next:(result)=>{
          if(result.length != 0){
            this.donations = result;
            this.hasResult = true;
          }
          else{
            this.resultString = "Didn't find any elements";
            this.hasResult = false;
          }
        }
      });
      break;
    default:
      break;
  }
}
  searchAddress:String = "";
  searchName:string = "";
  searchStart:string ="";
  searchEnd:string = "";
  router = inject(Router);
  constructor(private donationService:DonationService){}
  donations:Array<Donation> = [];
ngOnInit(): void {
  this.donationService.getDonations().subscribe({
    next: donationsA =>{
      this.donations = donationsA;
    },
    error: err =>{
      console.error(err);
    }
  });
}
addDonation():void{
  this.router.navigate([ '/editdonation' ]);
}

goToDonationForm(id?: string) {
  this.router.navigate([ '/editdonation', id ]);
}
}
