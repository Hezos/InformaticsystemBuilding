import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PlaceService } from '../services/place.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../../../../Models';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-place-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './place-form.component.html',
  styleUrl: './place-form.component.css',
  providers:[PlaceService]
})

export class PlaceFormComponent implements OnInit{
  
  formBuilder = inject(FormBuilder);
  place?:Place = {};
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isNewPlace:boolean = true;
  placeService = inject(PlaceService);
  placeForm = this.formBuilder.group<Place>({
    _id:Guid.create().toString(), name:'',address:'',active:false
  });

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    if(id){
      this.isNewPlace = false;
     this.placeService.GetOne(id).subscribe({
      next:(item) =>{
        console.log(item);
        this.placeForm.setValue(item);
      }
     });      
    }
    console.log(this.place);
  }

savePlace() {
  const place = this.placeForm.value as Place;
  console.log(place);
  if(this.isNewPlace)
   {
    place._id = Guid.create().toString(); 
    this.placeService.RegisterPlace(place).subscribe(
      {
        next: (result) =>{
          this.router.navigateByUrl('/places');
          //console.log(result);
        },
        error: (err) =>{
          console.error(err);
        }
      }
    );
  }
  else
  {
    this.placeService.UpdatePlace(place).subscribe({
      next:(result) =>{
        console.log(result);
        this.router.navigateByUrl('/places');
      },
      error:(err) =>{
        console.error(err);
      }
      
    });
    
  }
}


}
