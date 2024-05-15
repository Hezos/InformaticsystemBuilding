import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DonationService } from '../services/donation.service';
import { Donation } from '../../../../Models';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { PlaceService } from '../services/place.service';
import { DonorService } from '../services/donor.service';

@Component({
  selector: 'app-donation-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './donation-form.component.html',
  styleUrl: './donation-form.component.css',
  providers:[DonationService, PlaceService, DonorService]
})
export class DonationFormComponent implements OnInit {;
  formBuilder = inject(FormBuilder);
  donation?:Donation = {};
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isNewDonation:boolean = true;
  donationService = inject(DonationService);
  donationForm = this.formBuilder.group<Donation>({
    _id:Guid.create().toString(), address:'', date:new Date(), isAble:false, reason:'',doctor:'', isControlled:false, patient:'', SSN:'', endDate:new Date()
  });
  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
      
    if(id){
      this.isNewDonation = false;
      this.donationService.getOneDonation(id).subscribe({
        next:(donationA) =>{
          this.donationForm.setValue(donationA);
        },
        error: (err)=>{
          console.error(err);
        }
      });
    }
  }

  
  saveDonation() {
    const donationA = this.donationForm.value as Donation;

      if(this.isNewDonation)
        {
         donationA._id = Guid.create().toString(); 
         this.donationService.RegisterDonation(donationA).subscribe(
           {
             next: (result) =>{
                this.router.navigateByUrl('/message');
                //window.open('/message');
             },
             error: (err) =>{
               console.error(err);
             }
           }
         );
       }
       else
       {
         this.donationService.UpdateDonation(donationA).subscribe({
          next:(item) =>{
            this.router.navigateByUrl('/donations');
          },error: (err) =>{
            console.error(err);
          }
         });
       }
  }


}
