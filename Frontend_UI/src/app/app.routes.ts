import { Routes } from "@angular/router";
import { PlaceComponent } from "./place/place.component";
import { PlaceFormComponent } from "./place-form/place-form.component";
import { DonationComponent } from "./donation/donation.component";
import { DonorComponent } from "./donor/donor.component";
import { DonationFormComponent } from "./donation-form/donation-form.component";
import { DonorFormComponent } from "./donor-form/donor-form.component";
import { MessageComponent } from "./message/message.component";


//This file ideally would be added automatically
export const routes: Routes =[
    {
        path:'donations',
        component:DonationComponent
    },
    {
        path:'places',
        component:PlaceComponent
    },
    {
        path:'donor',
        component:DonorComponent
    },
    {
        path:'editplace/:id',
        component:PlaceFormComponent
    },

    {
        path:'editplace',
        component:PlaceFormComponent
    },
    {
        path:'editdonation',
        component:DonationFormComponent
    },
    {
        path:'editdonation/:id',
        component:DonationFormComponent
    },
    {
        path:'editdonor',
        component:DonorFormComponent
    },
    {
        path:'editdonor/:id',
        component:DonorFormComponent
    },
    {
        path:'message',
        component:MessageComponent
    }
];

export class AppComponent {
    title = 'FrontEndUI';
  }