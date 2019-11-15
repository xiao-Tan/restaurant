import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {


  newRestaurant:any
  errors = []
  nameError = false

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit( ) {
    this.newRestaurant = {name: "", cuisine: ""}
    this.nameError = false
    this.errors = []
  }

  onSubmit(){
    this._httpService.addOneRes(this.newRestaurant)
      .subscribe((data:any) => {
        this.newRestaurant = {name: ""}
        console.log(data)
        if(data.message == "success"){          
          this.goHome()
        }
        if(data.driver == true){
          this.errors = []
          this.nameError = true
        }
        else{
          this.errors = []
          let error_keys = Object.keys(data['errors']);
          for (var error_key of error_keys) {
            this.errors.push(data['errors'][error_key]['message'])
          }
        }
      })
  }

  goHome(){
    this._router.navigate(['/']);
  }

}
