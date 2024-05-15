import { Component, inject, OnInit } from '@angular/core';
import { PlaceService } from '../services/place.service';
import { Place } from 'D:/Jegyzetek/InformaticSystemBuilding/ToBeAdministrated/Models/index'
import {  HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place',
  standalone: true,
  imports: [ HttpClientModule],
  templateUrl: './place.component.html',
  styleUrl: './place.component.css',
  providers:[PlaceService],
})

export class PlaceComponent implements OnInit
{

  router = inject(Router);
  constructor(private placeService:PlaceService){}
  places:Array<Place> = [];
  ngOnInit(): void
   {  
    this.placeService.GetPlaces().subscribe({
      next: placesA => {
        this.places = placesA; 
        console.log(this.places);
      },
      error: err => console.error(err)
    });
   }
   dataSource = this.places;

  goToPlaceForm(id?: string) {
    this.router.navigate([ '/editplace', id ]);
  }

  AddPlace():void
  {
    this.router.navigate(['/editplace']);
  }  
}
