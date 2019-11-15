import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RestaurantComponent } from './restaurant/restaurant.component';
import { NewComponent } from './new/new.component';
import { AllreviewComponent } from './allreview/allreview.component';
import { NewreviewComponent } from './newreview/newreview.component';
import { EditComponent } from './restaurant/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    NewComponent,
    AllreviewComponent,
    NewreviewComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
