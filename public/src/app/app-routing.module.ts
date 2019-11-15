import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantComponent } from './restaurant/restaurant.component';
import { NewComponent } from './new/new.component';
import { AllreviewComponent } from './allreview/allreview.component';
import { NewreviewComponent } from './newreview/newreview.component';
import { EditComponent } from './restaurant/edit/edit.component';


const routes: Routes = [
  {
    path: 'restaurant', component: RestaurantComponent, children: [
      { path: ':id/edit', component: EditComponent }
    ]
  },
  { path: 'restaurant/new', component: NewComponent },
  { path: 'restaurant/:id', component: AllreviewComponent },
  { path: 'restaurant/:id/review', component: NewreviewComponent },
  { path: '', pathMatch: 'full', redirectTo: '/restaurant' },
  { path: '**', component: RestaurantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
