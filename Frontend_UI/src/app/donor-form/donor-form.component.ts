import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DonorService } from '../services/donor.service';
import { Donor } from '../../../../Models';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-donor-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './donor-form.component.html',
  styleUrl: './donor-form.component.css',
  providers:[DonorService]
})
export class DonorFormComponent implements OnInit{
  formBuilder = inject(FormBuilder);
  donor?:Donor = {};
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isNewDonor:boolean = true;
  donorService = inject(DonorService);
  donorForm = this.formBuilder.group<Donor>({
    _id:Guid.create().toString(), name:'', nation:'', birthplace:'',birthtime:new Date(),SSN:'',canApply:false, test:''
  });
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
   if(id){
    this.isNewDonor = false;
    this.donorService.GetOne(id).subscribe({
      next:(donorA)=>{
        this.donorForm.setValue(donorA);
      },error:(err) =>{
        console.error(err);
      }
    });
   }
  }

  saveDonor() {
    const donorA = this.donorForm.value as Donor;
    console.log(donorA);
    if(this.isNewDonor)
     { 
      this.donorService.RegisterDonor(donorA).subscribe({
        next:()=>{
            this.router.navigateByUrl('/donor');
         },
        error:(err)=>{
          console.error(err);
        }
      });
    }
    else
    {
      this.donorService.UpdateDonor(donorA).subscribe({
        next:() =>{
          this.router.navigateByUrl('/donor');
        },error:(err) =>{
          console.error(err);
        }
      });
    }
  }

}
